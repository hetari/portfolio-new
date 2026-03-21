import gsap from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

// ──────────────────────────────────────────────
// Register GSAP plugins here (single source of truth)
// e.g. import { ScrollTrigger } from 'gsap/ScrollTrigger'
//      gsap.registerPlugin(ScrollTrigger)
// ──────────────────────────────────────────────
gsap.registerPlugin(MorphSVGPlugin);

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
