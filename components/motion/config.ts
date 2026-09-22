/**
 * Motion constants for the anime.js layer. Mirrors the motion notes in app/globals.css.
 * Client-only helpers: call them inside effects, never during render.
 */
export const motion = {
  reveal: { duration: 900, ease: "outQuart", stagger: 90, distance: 24 },
  chips: { duration: 1100, ease: "outQuart", stagger: 110, distance: 28, drift: 6, driftMin: 3600, driftMax: 5400 },
  draw: { duration: 1500, ease: "inOutSine" },
  /** onScroll thresholds: "<container> <target>". Start when the target's top is 10% above the viewport bottom. */
  enter: "bottom-=10% top",
  /**
   * onScroll `sync` for one-shot entrances: play on enter and do nothing on leave. The default
   * ("play pause") pauses a linked animation when its target leaves the viewport, which strands
   * elements half-faded after a fast scroll.
   */
  once: "play",
} as const;

export function prefersReducedMotion(): boolean {
  return typeof window === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * True when the element starts below the fold. Only these are hidden before animating,
 * so nothing the visitor can already see ever flashes visible -> hidden -> visible.
 */
export function isBelowFold(el: Element): boolean {
  return el.getBoundingClientRect().top > window.innerHeight;
}

/**
 * anime.js is loaded on demand (after hydration, inside effects) so it never competes with the
 * LCP headshot. Only the modules we use are imported. The promise is shared across components.
 */
let modules: Promise<AnimeModules> | undefined;
export type AnimeModules = {
  animate: typeof import("animejs/animation").animate;
  onScroll: typeof import("animejs/events").onScroll;
  set: typeof import("animejs/utils").set;
  stagger: typeof import("animejs/utils").stagger;
  createDrawable: typeof import("animejs/svg").createDrawable;
};
export function loadAnime(): Promise<AnimeModules> {
  modules ??= Promise.all([
    import("animejs/animation"),
    import("animejs/events"),
    import("animejs/utils"),
    import("animejs/svg"),
  ]).then(([animation, events, utils, svg]) => ({
    animate: animation.animate,
    onScroll: events.onScroll,
    set: utils.set,
    stagger: utils.stagger,
    createDrawable: svg.createDrawable,
  }));
  return modules;
}

/**
 * Runs `setup` with anime.js once it has loaded, unless the component unmounted first or the
 * visitor prefers reduced motion. Returns the effect cleanup.
 */
export function withAnime(setup: (anime: AnimeModules) => (() => void) | void): () => void {
  if (prefersReducedMotion()) return () => {};
  let cancelled = false;
  let cleanup: (() => void) | void;
  loadAnime().then((anime) => {
    if (!cancelled) cleanup = setup(anime);
  });
  return () => {
    cancelled = true;
    cleanup?.();
  };
}
