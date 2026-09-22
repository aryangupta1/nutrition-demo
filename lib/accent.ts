/**
 * Accent-word markup for headings. Content strings may wrap ONE word in asterisks,
 * e.g. "Guiding you back to *balance*". `Heading` renders it as a styled <em>;
 * anything that isn't rendered HTML (metadata, JSON-LD, llms.txt, aria labels) must use `plain()`.
 */
const ACCENT = /\*([^*]+)\*/g;

/** Strip accent asterisks: "What Annette can *help* with" -> "What Annette can help with". */
export const plain = (text: string): string => text.replace(ACCENT, "$1");

export type AccentPart = { text: string; accent: boolean };

/** Split a string into plain and accented runs. */
export function splitAccent(text: string): AccentPart[] {
  const parts: AccentPart[] = [];
  let last = 0;
  for (const match of text.matchAll(ACCENT)) {
    const index = match.index ?? 0;
    if (index > last) parts.push({ text: text.slice(last, index), accent: false });
    parts.push({ text: match[1], accent: true });
    last = index + match[0].length;
  }
  if (last < text.length) parts.push({ text: text.slice(last), accent: false });
  return parts;
}
