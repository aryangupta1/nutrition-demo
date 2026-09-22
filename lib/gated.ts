/**
 * Gated content types for concept previews (see lib/content.ts).
 * A locked item keeps only its title, so withheld copy never reaches the HTML.
 * Kept free of "server-only" so section components (and their types) can import it anywhere.
 */
import type { StockKey } from "@/content/stock";

/** `image` is a decorative stock photo key only (never copy), so locked tiles still look designed. */
export type Locked = { locked: true; title: string; image?: StockKey };
export type Gated<T> = (T & { locked?: false }) | Locked;

export const isLocked = <T,>(item: Gated<T>): item is Locked => item.locked === true;
