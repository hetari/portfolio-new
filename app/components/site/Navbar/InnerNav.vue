<script setup lang="ts">
const navigationLinks = [
  { label: "Works", to: "/" },
  { label: "About", to: "/" },
  { label: "Services", to: "/" },
  { label: "Contact", to: "/" },
];
</script>

<template>
  <div class="flex flex-col gap-6 p-8">
    <div class="flex flex-col gap-4">
      <h1 class="text-xs font-bold tracking-widest text-white/40 uppercase">Navigation</h1>
      <nav class="flex flex-col gap-2">
        <NuxtLink
          v-for="(link, i) in navigationLinks"
          :key="i"
          :to="link.to"
          class="nav-link text-4xl font-extrabold transition-colors hover:text-[oklch(0.86_0.19_140)]"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>
    </div>

    <div class="flex flex-col gap-4 border-t border-white/10 pt-6">
      <h2 class="text-xs font-bold tracking-widest text-white/40 uppercase">Social</h2>
      <div class="flex gap-4">
        <a href="#" class="nav-link text-lg font-medium hover:text-[oklch(0.86_0.19_140)]"
          >LinkedIn</a
        >
        <a href="#" class="nav-link text-lg font-medium hover:text-[oklch(0.86_0.19_140)]"
          >GitHub</a
        >
        <a href="#" class="nav-link text-lg font-medium hover:text-[oklch(0.86_0.19_140)]"
          >Twitter</a
        >
      </div>
    </div>
  </div>
</template>
