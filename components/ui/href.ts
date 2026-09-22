/** True for same-site routes and in-page anchors (rendered with next/link). */
export function isInternalHref(href: string): boolean {
  return href.startsWith("/") || href.startsWith("#");
}
