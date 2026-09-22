"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { isBelowFold, motion, withAnime } from "./config";

const DRAW_ATTRS = ["pathLength", "stroke-dasharray", "stroke-dashoffset"];

/**
 * Draws SVG strokes marked `data-draw` with anime.js createDrawable.
 * - mode="play" (default): draws once when the wrapper scrolls into view.
 * - mode="scrub": drawing follows scroll position (smoothed) and reverses when scrolling back.
 * For dotted lines, put `data-draw` on a solid path inside an SVG <mask> (createDrawable uses
 * stroke-dasharray, which would erase the dots). Without JS, with reduced motion, or when the
 * wrapper is already on screen at load, the strokes are simply shown fully drawn.
 */
export function DrawPath({
  children,
  className,
  mode = "play",
}: {
  children: ReactNode;
  className?: string;
  mode?: "scrub" | "play";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(
    () =>
      withAnime(({ animate, onScroll, createDrawable }) => {
        const root = ref.current;
        if (!root || !isBelowFold(root)) return;
        const els = Array.from(root.querySelectorAll<SVGGeometryElement>("[data-draw]"));
        if (els.length === 0) return;

        const drawables = createDrawable(els); // starts undrawn ("0 0")
        const observer =
          mode === "scrub"
            ? onScroll({ target: root, enter: "bottom top", leave: "center+=10% top", sync: 0.6 })
            : onScroll({ target: root, enter: motion.enter, sync: motion.once, repeat: false });
        const animation = animate(drawables, {
          draw: ["0 0", "0 1"],
          duration: motion.draw.duration,
          ease: mode === "scrub" ? "linear" : motion.draw.ease,
          autoplay: observer,
        });

        return () => {
          animation.revert();
          observer.revert();
          els.forEach((el) => DRAW_ATTRS.forEach((attr) => el.removeAttribute(attr)));
        };
      }),
    [mode],
  );

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
