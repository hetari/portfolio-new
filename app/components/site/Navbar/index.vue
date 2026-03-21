<script setup lang="ts">
import { isMenuOpen, menuToggle } from "~/components/site/Navbar/state";
import { NAVBAR_CONFIG, setupNavbarAnimations } from "~/components/site/Navbar/animation";
import gsap from "gsap";

const onBeforeEnter = (el: Element) => {
  gsap.set(el, {
    opacity: 0,
  });
};

const onEnter = (el: Element, done: () => void) => {
  gsap.to(el, {
    duration: NAVBAR_CONFIG.duration,
    opacity: 1,
    ease: NAVBAR_CONFIG.ease,
    onComplete: done,
  });
};

const onLeave = (el: Element, done: () => void) => {
  gsap.to(el, {
    duration: NAVBAR_CONFIG.duration,
    opacity: 0,
    ease: NAVBAR_CONFIG.ease,
    onComplete: done,
  });
};

const headerRef = useTemplateRef<HTMLElement>("headerRef");
const mainNavRef = useTemplateRef<{
  topPathRef: SVGPathElement;
  bottomPathRef: SVGPathElement;
}>("mainNavRef");
const innerNavRef = useTemplateRef<HTMLElement>("innerNavRef");

// Call once during setup. setupNavbarAnimations internally uses useGsap (with onMounted) to manage the timeline.
setupNavbarAnimations(
  headerRef,
  computed(() => mainNavRef.value?.topPathRef ?? null),
  computed(() => mainNavRef.value?.bottomPathRef ?? null),
  innerNavRef,
);

const { escape } = useMagicKeys();
watch(
  () => escape?.value,
  isEscPressed => {
    if (isEscPressed && isMenuOpen.value) {
      isMenuOpen.value = false;
    }
  },
);
</script>

<template>
  <Transition @before-enter="onBeforeEnter" @enter="onEnter" @leave="onLeave">
    <div class="fixed inset-0 bg-black/50" v-show="isMenuOpen"></div>
  </Transition>
  <header
    ref="headerRef"
    class="fixed inset-x-4 top-4 z-2147483646 rounded-lg bg-foreground p-2 text-background md:mx-auto md:max-w-2xl lg:inset-x-0 lg:max-w-4xl"
    role="banner"
  >
    <SiteNavbarMainNav ref="mainNavRef" />

    <!-- InnerNav panel (starts hidden, animated by GSAP) -->
    <div
      ref="innerNavRef"
      class="invisible h-0 overflow-hidden"
      id="main-menu-inner"
      role="region"
      :aria-hidden="!isMenuOpen"
      aria-labelledby="main-menu"
    >
      <SiteNavbarInnerNav />
    </div>
  </header>
</template>
