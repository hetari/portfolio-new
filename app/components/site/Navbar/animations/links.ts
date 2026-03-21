import { NAVBAR_CONFIG } from "./config";

export function animateLinks(tl: gsap.core.Timeline, container: HTMLElement) {
  const links = container.querySelectorAll(".nav-link");
  if (links.length === 0) return;

  tl.set(
    links,
    {
      y: 20,
      autoAlpha: 0,
    },
    0,
  ).to(
    links,
    {
      y: 0,
      autoAlpha: 1,
      duration: NAVBAR_CONFIG.duration,
      ease: NAVBAR_CONFIG.ease,
      stagger: 0.07,
    },
    0, // Start together with inner nav
  );
}
