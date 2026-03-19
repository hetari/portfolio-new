<script setup lang="ts"></script>

<template>
  <!-- TODO: Skip to content link for accessibility -->
  <!-- <a
    href="#main-content"
    class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[2147483647] focus:rounded-lg focus:bg-background focus:px-4 focus:py-2 focus:text-foreground focus:outline focus:outline-2 focus:outline-primary"
  >
    Skip to content
  </a> -->
  <SiteNavbar />
  <main id="main-content" class="relative h-dvh w-full">
    <slot />
  </main>
</template>
