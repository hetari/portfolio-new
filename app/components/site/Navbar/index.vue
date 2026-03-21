<script setup lang="ts">
// --- Imports ---
import { isMenuOpen } from "~/components/site/Navbar/state";
import { NAVBAR_CONFIG, setupNavbarAnimations } from "~/components/site/Navbar/animations";
import gsap from "gsap";

// --- Menu State & Global Interactions ---
const { escape } = useMagicKeys();
watch(
  () => escape?.value,
  isEscPressed => {
    if (isEscPressed && isMenuOpen.value) {
      isMenuOpen.value = false;
    }
  },
);

const headerRef = useTemplateRef<HTMLElement>("headerRef");
onClickOutside(headerRef, () => {
  if (isMenuOpen.value) {
    isMenuOpen.value = false;
  }
});

// --- Backdrop Overlay Animation ---
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

// --- Navbar Layout & Animations ---
const mainNavRef = useTemplateRef<{
  topPathRef: SVGPathElement;
  bottomPathRef: SVGPathElement;
}>("mainNavRef");
const innerNavRef = useTemplateRef<HTMLElement>("innerNavRef");

// Initialize main navbar animations
setupNavbarAnimations(
  headerRef,
  computed(() => mainNavRef.value?.topPathRef ?? null),
  computed(() => mainNavRef.value?.bottomPathRef ?? null),
  innerNavRef,
);

watch(isMenuOpen, isOpen => {
  document.body.style.overflow = isOpen ? "clip" : "";
});
</script>

<template>
  <Transition @before-enter="onBeforeEnter" @enter="onEnter" @leave="onLeave">
    <div class="fixed inset-0 bg-black/50" v-show="isMenuOpen"></div>
  </Transition>
  <header
    ref="headerRef"
    class="fixed inset-x-4 top-4 z-2147483646 hidden -translate-y-25 rounded-lg bg-foreground p-3 text-background opacity-0 md:mx-auto md:max-w-2xl lg:inset-x-0 lg:max-w-4xl"
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
