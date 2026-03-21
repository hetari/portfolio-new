import type { Ref } from "vue";
import { isMenuOpen } from "~/components/site/Navbar/state";
import { toValue } from "vue";
import { animateHeader, showHeader } from "./header";
import { animateIcon } from "./icon";
import { animateInnerNav } from "./innerNav";
import { animateLinks } from "./links";

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

        // Add show/hide scroll reveal logic
        showHeader(gsap, header);

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
