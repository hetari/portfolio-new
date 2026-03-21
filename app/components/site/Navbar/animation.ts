import type { Ref } from "vue";
import { isMenuOpen } from "~/components/site/Navbar/state";
import { toValue } from "vue";

// --- Configuration ---
/**
 * Global animation configuration for the Navbar
 */
export const NAVBAR_CONFIG = {
  duration: 0.5,
  ease: "power3.inOut",
} as const;

// --- Helper Animation Functions ---

/**
 * Animates the header element with responsive behaviors.
 */
function animateHeader(
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

/**
 * Animates the menu icon from hamburger to X.
 */
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

/**
 * Animates the inner navigation panel (expand/collapse).
 */
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

/**
 * Animates the navigation links with a stagger effect.
 */
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

// --- Main Setup Function ---

/**
 * Sets up navbar sidebar animations using responsive matchMedia.
 */
export function setupNavbarAnimations(
  headerRef: Ref<HTMLElement | null>,
  topPathRef: Ref<SVGPathElement | null> | (() => SVGPathElement | null),
  bottomPathRef: Ref<SVGPathElement | null> | (() => SVGPathElement | null),
  innerNavRef: Ref<HTMLElement | null>,
) {
  useGsap(gsap => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)",
        isTablet: "(min-width: 768px) and (max-width: 1023px)", // Placeholder for user
        isLarge: "(min-width: 1024px)", // Placeholder for user
      },
      context => {
        const { isDesktop, isMobile } = context.conditions!;
        const header = toValue(headerRef);
        const topPath = toValue(topPathRef);
        const bottomPath = toValue(bottomPathRef);
        const innerNav = toValue(innerNavRef);

        if (!header || !topPath || !bottomPath || !innerNav) return;

        // ── Single Global Timeline ──
        const mainTl = gsap.timeline({
          paused: true,
          onReverseComplete: () => {
            // Clear all GSAP-added inline styles to revert to pure CSS/Tailwind state
            gsap.set([header, innerNav], { clearProps: "all" });
          },
        });

        const { width: windowWidth } = useWindowSize();
        watch(windowWidth, () => {
          const progress = mainTl.progress();
          mainTl.progress(0).invalidate().progress(progress);
        });

        // Add responsive header animation
        animateHeader(gsap, mainTl, header, !!isDesktop, !!isMobile);

        // Add shared icon animation
        animateIcon(mainTl, topPath, bottomPath);

        // Add inner nav animation
        animateInnerNav(mainTl, innerNav);

        // Add links animation
        animateLinks(mainTl, innerNav);

        // SYNC: If the menu is already open when the breakpoint changes (or on mount),
        // ensure the new timeline is at the correct state.
        if (isMenuOpen.value) {
          mainTl.progress(1);
        }

        // ── React to menu state changes ──
        const stopWatch = watch(
          isMenuOpen,
          open => {
            if (open) {
              mainTl.play();
            } else {
              mainTl.reverse();
            }
          },
          { immediate: true },
        );

        return () => {
          stopWatch();
          mainTl.kill();
        };
      },
    );
  });
}
