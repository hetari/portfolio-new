import gsap from "gsap";

// ──────────────────────────────────────────────
// Register GSAP plugins here (single source of truth)
// e.g. import { ScrollTrigger } from 'gsap/ScrollTrigger'
//      gsap.registerPlugin(ScrollTrigger)
// ──────────────────────────────────────────────

type GsapCallback = (instance: typeof gsap) => void;

/**
 * A composable that runs a GSAP animation callback after the component mounts
 * and automatically cleans up (reverts) all tweens/timelines on scope dispose.
 *
 * @example
 * ```ts
 * useGsap((gsap) => {
 *   gsap.to('.box', { x: 100 })
 * })
 * ```
 *
 * @returns The `gsap.Context` instance for manual control if needed.
 */
export function useGsap(callback?: GsapCallback): gsap.Context {
  const ctx = gsap.context(() => {});

  onMounted(() => {
    if (callback) {
      ctx.add(() => {
        callback(gsap);
      });
    }
  });

  onScopeDispose(() => {
    ctx.revert();
  });

  return ctx;
}
