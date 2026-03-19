<script setup lang="ts">
const container = useTemplateRef<HTMLDivElement>("container");
const text = useTemplateRef<HTMLHeadingElement>("text");

const { style, isReady } = useFitText(text, container);

useHead({
  title: "Home",
});
</script>

<template>
  <section class="flex h-dvh flex-col overflow-hidden" aria-label="Portfolio Hero" role="region">
    <!-- Up section for text -->
    <div class="flex flex-1 flex-col justify-center px-6 lg:px-12">
      <p
        class="max-w-3xl font-heading text-4xl font-medium tracking-tighter text-foreground/80 md:text-5xl lg:text-6xl"
      >
        Digital Craftsman & <br />
        Creative Developer.
      </p>
    </div>

    <!-- Bottom section for name -->
    <div ref="container" class="w-full">
      <h1
        ref="text"
        class="inline-block overflow-clip font-fancy leading-[0.8] text-fit whitespace-nowrap uppercase"
        :style="[style, { opacity: isReady ? 1 : 0, transition: 'opacity 0.4s ease' }]"
        data-vitals-ignore
      >
        <!-- EBRAHEEM -->
        <AnimationLetterByLetter :start="isReady" text="EBRAHEEM" />
      </h1>
    </div>
  </section>
</template>
