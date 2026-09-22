import { stock, type StockKey } from "@/content/stock";
import { cn } from "@/lib/cn";
import { Image } from "./Image";

/**
 * Floating pill chip: a small square stock thumbnail plus a short label (Holistic "signs" chips).
 * The thumbnail is decorative (alt=""): the label carries the meaning.
 * Carries `data-chip` so <FloatChips> can animate it; it is fully static without JS.
 */
export function Chip({ label, image, className }: { label: string; image: StockKey; className?: string }) {
  const img = stock[image];
  return (
    <span
      data-chip
      className={cn(
        "inline-flex max-w-72 items-center gap-3 rounded-pill bg-surface-raised py-1.5 pr-5 pl-1.5 text-left text-small font-medium text-text shadow-chip",
        className,
      )}
    >
      <Image src={img.src} width={img.width} height={img.height} alt="" rounded="thumb" sizes="3rem" className="size-10 shrink-0" />
      <span className="text-pretty">{label}</span>
    </span>
  );
}
