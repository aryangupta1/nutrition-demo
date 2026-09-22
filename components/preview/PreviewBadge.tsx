"use client";

import { useSyncExternalStore } from "react";

// Dismissal persists for the browser session. useSyncExternalStore keeps SSR (badge shown) and client in sync.
const KEY = "preview-badge";
const listeners = new Set<() => void>();
const subscribe = (fn: () => void) => (listeners.add(fn), () => void listeners.delete(fn));
const isDismissed = () => {
  try {
    return sessionStorage.getItem(KEY) === "dismissed";
  } catch {
    return false;
  }
};
const dismiss = () => {
  try {
    sessionStorage.setItem(KEY, "dismissed");
  } catch {}
  listeners.forEach((fn) => fn());
};

type Props = {
  text: string;
  authorName: string;
  ctaLabel: string;
  ctaHref: string;
  pitchLink?: { label: string; href: string };
  dismissLabel: string;
};

/** Fixed, dismissible corner badge shown on every page of a preview deployment. */
export function PreviewBadge({ text, authorName, ctaLabel, ctaHref, pitchLink, dismissLabel }: Props) {
  const hidden = useSyncExternalStore(subscribe, isDismissed, () => false);

  if (hidden) return null;
  return (
    <aside
      aria-label="Concept preview"
      data-tone="inverse"
      className="fixed right-3 bottom-3 z-50 flex max-w-sm items-start gap-3 rounded-card bg-surface-inverse/95 p-4 pr-3 text-small shadow-lift backdrop-blur-md md:right-5 md:bottom-5"
    >
      <div className="flex flex-col gap-1.5">
        <p className="text-text">{text}</p>
        {authorName ? <p className="text-text-muted">by {authorName}</p> : null}
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          {ctaLabel && ctaHref ? (
            <a href={ctaHref} className="text-text underline decoration-border-strong underline-offset-4 hover:decoration-text">
              {ctaLabel}
            </a>
          ) : null}
          {pitchLink ? (
            <a href={pitchLink.href} className="text-primary underline underline-offset-4">
              {pitchLink.label}
            </a>
          ) : null}
        </div>
      </div>
      <button
        type="button"
        aria-label={dismissLabel}
        className="-mt-1 inline-flex size-tap shrink-0 items-center justify-center rounded-md text-text-muted hover:text-text"
        onClick={dismiss}
      >
        <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4">
          <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>
    </aside>
  );
}
