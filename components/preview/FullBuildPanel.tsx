import { preview } from "@/content/site";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";

/** "What the full site includes" panel, rendered above the footer in preview mode. */
export function FullBuildPanel() {
  const { heading, items } = preview.fullBuildPanel;
  return (
    <Section tone="sage" aria-labelledby="full-build">
      <div className="grid gap-8 md:grid-cols-12">
        <Heading as="h2" id="full-build" className="md:col-span-4">
          {heading}
        </Heading>
        <ul className="grid gap-x-8 gap-y-4 text-lead text-text sm:grid-cols-2 md:col-span-8">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <svg aria-hidden="true" viewBox="0 0 16 16" className="mt-1.5 size-4 shrink-0 text-primary">
                <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1.2" />
                <path d="M5 8.2 7 10l4-4" fill="none" stroke="currentColor" strokeWidth="1.4" />
              </svg>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
