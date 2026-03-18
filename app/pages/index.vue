<script setup lang="ts">
const container = useTemplateRef<HTMLDivElement>("container");
const text = useTemplateRef<HTMLHeadingElement>("text");

const { style, isReady } = useFitText(text, container);
</script>

<template>
  <div class="relative min-h-dvh w-full px-4">
    <!-- Nav bar space (optional - add your nav here) -->
    <div ref="container" class="relative h-dvh">
      <!-- Text container - positioned at the top -->
      <h1
        ref="text"
        class="bootom-0 absolute inline-block font-fancy text-fit whitespace-nowrap"
        :class="isReady ? 'opacity-100' : 'opacity-0'"
        :style="style"
      >
        <AnimationLetterByLetter text="EBRAHEEM" />
      </h1>
    </div>
  </div>
</template>
