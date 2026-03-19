import gsap from "gsap";
import { isMenuOpen } from "~/components/site/Navbar/state";

/**
 * Sets up navbar sidebar animations:
 * 1. Expands/contracts the header element (full-width ↔ constrained)
 * 2. Slides the InnerNav panel down/up
 *
 * Call this inside a component's `useGsap` callback,
 * passing the template refs for the header and the inner-nav wrapper.
 */
export function setupNavbarAnimations(
  headerEl: Ref<HTMLElement | null>,
  innerNavEl: Ref<HTMLElement | null>,
) {
  let expandTl: gsap.core.Timeline;
  let slideTl: gsap.core.Timeline;

  useGsap(() => {
    if (!headerEl.value || !innerNavEl.value) return;

    // ── Header expand / contract ──
    expandTl = gsap.timeline({ paused: true, defaults: { ease: "power3.inOut", duration: 0.5 } });
    expandTl.to(headerEl.value, {
      maxWidth: "100%",
      marginLeft: 0,
      marginRight: 0,
      borderRadius: "0.75rem",
    });

    // ── InnerNav slide down / up ──
    slideTl = gsap.timeline({ paused: true, defaults: { ease: "power3.inOut", duration: 0.5 } });
    slideTl.fromTo(innerNavEl.value, { height: 0, autoAlpha: 0 }, { height: "auto", autoAlpha: 1 });

    // ── React to menu state changes ──
    watch(isMenuOpen, open => {
      if (open) {
        expandTl.play();
        slideTl.play();
      } else {
        expandTl.reverse();
        slideTl.reverse();
      }
    });
  });
}
