<script setup lang="ts">
import { isMenuOpen, menuToggle } from "~/components/site/Navbar/state";
import { setupNavbarAnimations } from "~/components/site/Navbar/animation";

const headerRef = useTemplateRef<HTMLElement>("headerRef");
const innerNavRef = useTemplateRef<HTMLElement>("innerNavRef");

setupNavbarAnimations(headerRef, innerNavRef);
</script>

<template>
  <header
    ref="headerRef"
    class="fixed inset-x-4 top-4 z-2147483647 rounded-xl bg-foreground px-5 py-2.5 text-background md:mx-auto md:max-w-2xl lg:inset-x-0 lg:max-w-4xl"
    role="banner"
  >
    <nav class="mx-auto flex max-w-2xl items-center justify-between" aria-label="Main navigation">
      <!-- Left: Menu toggle -->
      <button
        type="button"
        class="extend-touch-target inline-flex cursor-pointer items-center gap-2 rounded-lg transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        @click="menuToggle()"
        :aria-label="isMenuOpen ? 'Close menu' : 'Open menu'"
        :aria-expanded="isMenuOpen"
        id="menu-toggle"
        aria-controls="main-menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          aria-hidden="true"
          focusable="false"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="4" y1="8.5" x2="20" y2="8.5" />
          <line x1="4" y1="15.5" x2="20" y2="15.5" />
        </svg>
        <span class="font-medium">Menu</span>
      </button>

      <!-- Center: Logo / Brand -->
      <NuxtLink
        to="/"
        class="cursor-pointer font-heading text-[1.45rem] font-extrabold tracking-[0.12em] uppercase transition-opacity duration-200 hover:opacity-80 focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        aria-label="Hetari — Home"
      >
        OSMO
      </NuxtLink>

      <!-- Right: Auth actions -->
      <div class="flex items-center gap-2" role="group" aria-label="Account actions">
        <!-- <button
          variant="outline"
          size="sm"
          class="rounded-full px-5 py-1.5 text-[0.875rem] font-semibold transition-all duration-200 active:scale-95 hover:bg-[oklch(0.42_0_0)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Login
        </button>
        -->
        <button
          variant="default"
          size="sm"
          class="rounded-full px-5 py-1.5 text-[0.875rem] font-semibold transition-all duration-200 hover:bg-[oklch(0.86_0.19_140)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:scale-95"
        >
          Join
        </button>
      </div>
    </nav>

    <!-- InnerNav panel (starts hidden, animated by GSAP) -->
    <div
      ref="innerNavRef"
      class="invisible h-0 overflow-hidden"
      id="main-menu"
      role="region"
      :aria-hidden="!isMenuOpen"
      aria-labelledby="menu-toggle"
    >
      <SiteNavbarInnerNav />
    </div>
  </header>
</template>
