<script setup lang="ts">
import { isMenuOpen, menuToggle } from "~/components/site/Navbar/state";
import { setupNavbarAnimations } from "~/components/site/Navbar/animation";
import type { SVGAttributes } from "vue";

const headerRef = useTemplateRef<HTMLElement>("headerRef");
const topPathRef = useTemplateRef<SVGPathElement>("topPathRef");
const bottomPathRef = useTemplateRef<SVGPathElement>("bottomPathRef");
// const innerNavRef = useTemplateRef<HTMLElement>("innerNavRef");

setupNavbarAnimations(headerRef, topPathRef, bottomPathRef);
</script>

<template>
  <header
    ref="headerRef"
    class="fixed inset-x-4 top-4 z-2147483646 rounded-xl bg-foreground px-5 py-4 text-background md:mx-auto md:max-w-2xl lg:inset-x-0 lg:max-w-4xl"
    role="banner"
  >
    <nav class="flex w-full items-center justify-between" aria-label="Main navigation">
      <!-- Left: Menu toggle -->
      <button
        type="button"
        class="extend-touch-target inline-flex cursor-pointer items-center gap-2 rounded-lg p-2 transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-white"
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
        class="tracking-0 cursor-pointer font-heading text-2xl font-extrabold uppercase transition-opacity duration-200 hover:opacity-80 focus-visible:rounded-sm focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-white"
        aria-label="Hetari — Home"
      >
        HETARI
      </NuxtLink>

      <!-- Right: Auth actions -->
      <div class="flex items-center gap-2" role="group" aria-label="Account actions">
        <button
          class="cursor-pointer rounded-full px-5 py-1.5 text-sm font-semibold transition-colors duration-200 hover:bg-[oklch(0.86_0.19_140)] hover:text-black focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Contact
        </button>
      </div>
    </nav>

    <!-- InnerNav panel (starts hidden, animated by GSAP) -->
    <!-- <div
      ref="innerNavRef"
      class="invisible h-0 overflow-hidden"
      id="main-menu"
      role="region"
      :aria-hidden="!isMenuOpen"
      aria-labelledby="menu-toggle"
    >
      <SiteNavbarInnerNav />
    </div> -->
  </header>
</template>
