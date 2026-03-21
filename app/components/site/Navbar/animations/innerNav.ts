import { NAVBAR_CONFIG } from "./config";

export function animateInnerNav(tl: gsap.core.Timeline, innerNav: HTMLElement) {
  tl.to(
    innerNav,
    {
      height: "auto",
      autoAlpha: 1,
      visibility: "visible",
      duration: 0.8, // Match approximate total links duration
      ease: NAVBAR_CONFIG.ease,
    },
    0,
  );
}
