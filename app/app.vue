<script setup lang="ts">
const container = useTemplateRef<HTMLDivElement>("container");
const text = useTemplateRef<HTMLHeadingElement>("text");

const { style, isReady } = useFitText(text, container);
</script>

<template>
  <div class="relative min-h-dvh w-full">
    <div ref="container" class="flex-center overflow-x-clip overflow-y-clip">
      <h1
        ref="text"
        class="font-fancy text-fit whitespace-nowrap"
        :class="isReady ? 'opacity-100' : 'opacity-0'"
        :style="style"
      >
        EBRAHEEM
      </h1>
    </div>
  </div>
</template>
