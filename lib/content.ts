import "server-only";
import { home, preview, type FaqItem, type Service, type Step } from "@/content/site";
import type { SiteMode } from "@/lib/site-mode";
import type { Gated, Locked } from "@/lib/gated";

/**
 * Content gating for concept previews. Components receive already-gated data:
 * a locked item keeps only its title, so withheld copy never reaches the HTML.
 */

export { isLocked, type Gated, type Locked } from "@/lib/gated";

/** Concern chips must quote a verified service item verbatim. Fails the build otherwise. */
const serviceItems = new Set(home.services.items.flatMap((s) => s.items));
for (const chip of home.concerns.chips) {
  if (!serviceItems.has(chip.label)) {
    throw new Error(`home.concerns chip "${chip.label}" is not a verbatim services.items[].items entry`);
  }
}

/** Items past `live` keep only what `keep` returns (title + optional stock image key): never body copy. */
function gate<T>(items: readonly T[], live: number, keep: (item: T) => Omit<Locked, "locked">): Gated<T>[] {
  return items.map((item, i) => (i < live ? (item as Gated<T>) : { locked: true as const, ...keep(item) }));
}

export function getHomeContent(access: SiteMode) {
  if (access === "full") {
    return {
      ...home,
      services: { ...home.services, items: home.services.items as Gated<Service>[] },
      approach: {
        ...home.approach,
        pillars: home.approach.pillars as Gated<Step>[],
        steps: home.approach.steps as Gated<Step>[],
      },
      faq: { ...home.faq, items: home.faq.items as Gated<FaqItem>[] },
      needsInput: null,
    };
  }
  const t = preview.teaser;
  return {
    ...home,
    services: { ...home.services, items: gate(home.services.items, t.servicesLive, (s) => ({ title: s.title, image: s.image })) },
    approach: {
      ...home.approach,
      pillars: gate(home.approach.pillars, t.pillarsLive, (s) => ({ title: s.title })),
      steps: gate(home.approach.steps, t.stepsLive, (s) => ({ title: s.title })),
    },
    faq: { ...home.faq, items: gate(home.faq.items, t.faqLive, (f) => ({ title: f.question })) },
    // Areas blocked on Annette's details, shown only in preview.
    needsInput: preview.needsInput,
  };
}

export type HomeContent = ReturnType<typeof getHomeContent>;
