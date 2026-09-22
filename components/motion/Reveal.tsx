"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { isBelowFold, motion, withAnime } from "./config";

/**
 * Fade-and-rise on scroll. Animates descendants marked `data-reveal` (staggered),
 * or the wrapper itself when there are none. Progressive enhancement: the server HTML is
 * fully visible; elements are only hidden (inside the effect) when they start below the fold,
 * and nothing animates under prefers-reduced-motion.
 */
export function Reveal({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol";
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(
    () =>
      withAnime(({ animate, onScroll, set, stagger }) => {
        const root = ref.current;
        if (!root || !isBelowFold(root)) return;
        const items = root.querySelectorAll<HTMLElement>("[data-reveal]");
        const targets = items.length > 0 ? Array.from(items) : [root];
        const { duration, ease, distance } = motion.reveal;
        // Hide only now (JS running, element off-screen); the server HTML stays visible without JS.
        const initial = set(targets, { opacity: 0, translateY: distance });
        const observer = onScroll({ target: root, enter: motion.enter, sync: motion.once, repeat: false });
        const animation = animate(targets, {
          opacity: [0, 1],
          translateY: [distance, 0],
          duration,
          ease,
          delay: stagger(motion.reveal.stagger),
          autoplay: observer,
        });
        return () => {
          animation.revert();
          initial.revert();
          observer.revert();
        };
      }),
    [],
  );

  return (
    <Tag ref={ref as never} className={cn(className)}>
      {children}
    </Tag>
  );
}
