<script setup lang="ts">
const container = useTemplateRef<HTMLDivElement>("container");
const text = useTemplateRef<HTMLHeadingElement>("text");

const { style, isReady } = useFitText(text, container);

useHead({
  title: "Home",
});
</script>

<template>
  <div>
    lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, doloremque. Lorem ipsum dolor
    sit amet consectetur adipisicing elit. Voluptas, doloremque.
  </div>
  <section
    class="grid h-dvh grid-rows-[2fr_1fr] overflow-hidden"
    aria-label="Portfolio Hero"
    role="region"
  >
    <!-- Top: 2 rows -->
    <!-- <div class="grid place-content-center"> -->
    <!--
      <p
        class="max-w-3xl font-heading text-4xl font-medium tracking-tighter text-foreground/80 md:text-5xl lg:text-6xl"
      >
        Digital Craftsman & <br />
        Creative Developer.
      </p>
    -->
    <!-- </div> -->

    <!-- Bottom: 1 row -->
    <!-- <div
      ref="container"
      class="grid place-items-end w-full"
    >
      <h1
        ref="text"
        class="inline-block overflow-clip font-fancy leading-[0.8] text-fit whitespace-nowrap uppercase will-change-all"
        :style="[style, { opacity: isReady ? 1 : 0, transition: 'opacity 0.2s ease' }]"
        data-vitals-ignore
      >
        <AnimationLetterByLetter
          :start="isReady"
          text="EBRAHEEM"
          :delay="0.2"
        />
      </h1>
    </div> -->
  </section>
  <div>
    lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, doloremque. Lorem ipsum dolor
    sit amet consectetur adipisicing elit. Voluptas, doloremque.
  </div>
</template>
