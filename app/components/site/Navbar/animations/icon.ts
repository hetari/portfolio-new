import { NAVBAR_CONFIG } from "./config";

export function animateIcon(
  tl: gsap.core.Timeline,
  topPath: SVGPathElement,
  bottomPath: SVGPathElement,
) {
  tl.to(
    topPath,
    {
      attr: { d: "M5 5L19 19" },
      duration: NAVBAR_CONFIG.duration,
      ease: NAVBAR_CONFIG.ease,
    },
    0,
  ).to(
    bottomPath,
    {
      attr: { d: "M5 19L19 5" },
      duration: NAVBAR_CONFIG.duration,
      ease: NAVBAR_CONFIG.ease,
    },
    0,
  );
}
