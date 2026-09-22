"use client";

import { useEffect, useRef, type ReactNode } from "react";
import type { JSAnimation } from "animejs/animation";
import { isBelowFold, motion, withAnime } from "./config";

/**
 * Floating pill chips (Holistic "signs" pattern). Descendants marked `data-chip` that start
 * below the fold float in with a stagger when they scroll into view, then drift slowly.
 * Chips already on screen at load (e.g. the hero) skip the entrance and only drift, so nothing
 * visible is ever hidden. Drift pauses while the group is off-screen.
 * No animation at all under prefers-reduced-motion.
 */
export function FloatChips({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(
    () =>
      withAnime(({ animate, onScroll, set, stagger }) => {
        const root = ref.current;
        if (!root) return;
        const chips = Array.from(root.querySelectorAll<HTMLElement>("[data-chip]"));
        if (chips.length === 0) return;

        const { duration, ease, distance, drift, driftMin, driftMax } = motion.chips;
        const drifts: JSAnimation[] = [];
        let inView = true;

        const startDrift = (group: HTMLElement[]) => {
          group.forEach((chip) => {
            const i = chips.indexOf(chip);
            drifts.push(
              animate(chip, {
                translateY: [0, i % 2 === 0 ? -drift : drift],
                rotate: [0, i % 3 === 0 ? 0.8 : -0.8],
                // Deterministic spread of durations so the chips never move in sync.
                duration: driftMin + ((i * 977) % (driftMax - driftMin)),
                ease: "inOutSine",
                loop: true,
                alternate: true,
                autoplay: inView,
              }),
            );
          });
        };

        const visibility = onScroll({
          target: root,
          repeat: true,
          onEnter: () => {
            inView = true;
            drifts.forEach((a) => a.play());
          },
          onLeave: () => {
            inView = false;
            drifts.forEach((a) => a.pause());
          },
        });

        // Chips already on screen only drift; chips below the fold float in (staggered) when the
        // first of them scrolls into view. Hidden only now (JS running, off-screen), so the server
        // HTML stays fully visible without JS.
        const below = chips.filter(isBelowFold);
        startDrift(chips.filter((chip) => !below.includes(chip)));

        let initial: JSAnimation | undefined;
        let entrance: JSAnimation | undefined;
        const entranceObserver = below.length > 0 ? onScroll({ target: below[0], enter: motion.enter, sync: motion.once, repeat: false }) : undefined;
        if (entranceObserver) {
          initial = set(below, { opacity: 0, translateY: distance, scale: 0.94 });
          entrance = animate(below, {
            opacity: [0, 1],
            translateY: [distance, 0],
            scale: [0.94, 1],
            duration,
            ease,
            delay: stagger(motion.chips.stagger),
            autoplay: entranceObserver,
            onComplete: () => startDrift(below),
          });
        }

        return () => {
          drifts.forEach((a) => a.revert());
          entrance?.revert();
          initial?.revert();
          entranceObserver?.revert();
          visibility.revert();
        };
      }),
    [],
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
