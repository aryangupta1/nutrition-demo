import "server-only";
import { home, preview, type FaqItem, type Service, type Step } from "@/content/site";
import type { SiteMode } from "@/lib/site-mode";

/**
 * Content gating for concept previews. Components receive already-gated data:
 * a locked item keeps only its title, so withheld copy never reaches the HTML.
 */

export type Locked = { locked: true; title: string };
export type Gated<T> = (T & { locked?: false }) | Locked;

export const isLocked = <T,>(item: Gated<T>): item is Locked => item.locked === true;

function gate<T>(items: readonly T[], live: number, title: (item: T) => string): Gated<T>[] {
  return items.map((item, i) => (i < live ? (item as Gated<T>) : { locked: true as const, title: title(item) }));
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
    services: { ...home.services, items: gate(home.services.items, t.servicesLive, (s) => s.title) },
    approach: {
      ...home.approach,
      pillars: gate(home.approach.pillars, t.pillarsLive, (s) => s.title),
      steps: gate(home.approach.steps, t.stepsLive, (s) => s.title),
    },
    faq: { ...home.faq, items: gate(home.faq.items, t.faqLive, (f) => f.question) },
    // Areas blocked on Annette's details, shown only in preview.
    needsInput: preview.needsInput,
  };
}

export type HomeContent = ReturnType<typeof getHomeContent>;
