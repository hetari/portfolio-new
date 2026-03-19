<script setup lang="ts">
const colorMode = useColorMode();
</script>

<template>
  <div class="flex items-center gap-3">
    <label for="theme-select" class="sr-only">Select Theme</label>
    <select
      id="theme-select"
      v-model="colorMode.preference"
      class="rounded-md border border-border bg-background px-3 py-1 text-sm font-medium transition-colors hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
    >
      <option value="system">System</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="sepia">Sepia</option>
    </select>
  </div>
</template>
