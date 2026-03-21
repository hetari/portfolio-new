import type gsap from "gsap";
import type { TemplateRef } from "vue";
import { isMenuOpen } from "~/components/site/Navbar/state";

/**
 * Global animation configuration for the Navbar
 */
const NAVBAR_CONFIG = {
  duration: 0.5,
  ease: "power3.inOut",
} as const;

/**
 * Animates the header element with responsive behaviors.
 */
function animateHeader(
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
}

/**
 * Animates the menu icon from hamburger to X.
 */
function animateIcon(tl: gsap.core.Timeline, topPath: SVGPathElement, bottomPath: SVGPathElement) {
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
 * Sets up navbar sidebar animations using responsive matchMedia.
 */
export function setupNavbarAnimations(
  headerRef: TemplateRef<HTMLElement | null>,
  topPathRef: TemplateRef<SVGPathElement | null>,
  bottomPathRef: TemplateRef<SVGPathElement | null>,
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
        const header = headerRef.value;
        const topPath = topPathRef.value;
        const bottomPath = bottomPathRef.value;

        if (!header || !topPath || !bottomPath) return;

        // ── Single Global Timeline ──
        const mainTl = gsap.timeline({
          paused: true,
          onReverseComplete: () => {
            // Clear all GSAP-added inline styles to revert to pure CSS/Tailwind state
            gsap.set(header, { clearProps: "all" });
          },
        });

        // Add responsive header animation
        animateHeader(mainTl, header, !!isDesktop, !!isMobile);

        // Add shared icon animation
        animateIcon(mainTl, topPath, bottomPath);

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
