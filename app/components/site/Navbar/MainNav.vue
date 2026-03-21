<script setup lang="ts">
// --- State & Actions ---
import { isMenuOpen, menuToggle } from "./state";

// --- Animation Template Refs ---
const topPathRef = useTemplateRef<SVGPathElement>("topPathRef");
const bottomPathRef = useTemplateRef<SVGPathElement>("bottomPathRef");

// Expose refs for parent (index.vue) to use in GSAP animations
defineExpose({
  topPathRef,
  bottomPathRef,
});
</script>

<template>
  <nav class="flex w-full items-center justify-between text-2xl" aria-label="Main navigation">
    <!-- Left: Menu toggle -->
    <button
      type="button"
      class="extend-touch-target inline-flex cursor-pointer items-center gap-2 rounded-md p-2 transition-colors hover:bg-white/10"
      @click="menuToggle()"
      :aria-label="isMenuOpen ? 'Close menu' : 'Open menu'"
      :aria-expanded="isMenuOpen"
      id="main-menu"
      aria-controls="main-menu"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        color="currentColor"
        fill="none"
        class="overflow-visible"
      >
        <path
          ref="topPathRef"
          d="M4 8.5L20 8.5"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        />
        <path
          ref="bottomPathRef"
          d="M4 15.5L20 15.5"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        />
      </svg>

      <span class="font-medium">Menu</span>
    </button>

    <!-- Center: Logo / Brand -->
    <NuxtLink
      to="/"
      class="extend-touch-target cursor-pointer font-heading text-3xl font-black uppercase transition-opacity duration-300 ease-in-out hover:opacity-80"
      aria-label="Hetari — Home"
    >
      HETARI
    </NuxtLink>

    <!-- Right: Auth actions -->
    <div
      class="extend-touch-target flex items-center gap-2"
      role="group"
      aria-label="Account actions"
    >
      <button
        class="cursor-pointer rounded-full px-5 py-1.5 font-semibold transition-colors duration-200 hover:bg-[oklch(0.86_0.19_140)] hover:text-black"
      >
        Contact
      </button>
    </div>
  </nav>
</template>
