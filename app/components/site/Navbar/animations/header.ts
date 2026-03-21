import { NAVBAR_CONFIG } from "./config";

export const showHeader = (g: typeof gsap, header: HTMLElement) => {
  // 1. Show the nav with slide animation from top when scrolling 100px
  g.to(header, {
    y: 0,
    display: "block",
    opacity: 1,
    duration: 0.4,
    ease: NAVBAR_CONFIG.ease,
    scrollTrigger: {
      start: 100,
      end: 100,
      toggleActions: "play none none reverse",
      invalidateOnRefresh: true,
    },
  });

  // 2. After 100px + 50px (150px total), apply the original "display: block" logic
  g.to(header, {
    display: "block",
    duration: 0.25,
    ease: "power1.inOut",
    overwrite: "auto",
    scrollTrigger: {
      start: 150,
      end: 200,
      toggleActions: "play none none reverse",
      invalidateOnRefresh: true,
    },
  });

  // 3. Update padding animation (also starts at 150px)
  g.to(header, {
    padding: "6px",
    duration: 0.25,
    ease: "power1.inOut",
    overwrite: "auto",
    scrollTrigger: {
      start: 150,
      end: 200,
      toggleActions: "play none none reverse",
      invalidateOnRefresh: true,
    },
  });
};

export function animateHeader(
  g: typeof gsap,
  tl: gsap.core.Timeline,
  header: HTMLElement,
  isDesktop: boolean,
  isMobile: boolean,
) {
  // Ensure header is visible when menu is open (even if scroll is 0)
  tl.set(header, { display: "block", opacity: 1, y: 0 }, 0);

  if (isDesktop) {
    tl.to(
      header,
      {
        maxWidth: "98vw",
        marginLeft: "1vw",
        marginRight: "1vw",
        borderRadius: "0.75rem",
        duration: NAVBAR_CONFIG.duration,
        ease: NAVBAR_CONFIG.ease,
      },
      0,
    );
  } else if (isMobile) {
    tl.to(
      header,
      {
        top: "0px",
        left: "0px",
        right: "0px",
        width: "100vw",
        borderRadius: "0px",
        duration: NAVBAR_CONFIG.duration,
        ease: NAVBAR_CONFIG.ease,
      },
      0,
    );
  }
}
