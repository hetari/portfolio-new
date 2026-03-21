import { NAVBAR_CONFIG } from "./config";

export function animateHeader(
  g: typeof gsap,
  tl: gsap.core.Timeline,
  header: HTMLElement,
  isDesktop: boolean,
  isMobile: boolean,
) {
  if (isDesktop) {
    tl.to(
      header,
      {
        maxWidth: "96vw",
        marginLeft: "2vw",
        marginRight: "2vw",
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

  g.to(header, {
    padding: "6px",
    // cahnge padding by 0.1px
    duration: 0.25,
    ease: "power1.inOut",
    overwrite: "auto",
    scrollTrigger: {
      trigger: "#hero-section",
      start: "15% 10%",
      end: "+=50px",
      toggleActions: "play none none reverse", // onEnter, onLeave, onEnterBack, onLeaveBack
      invalidateOnRefresh: true,
    },
  });
}
