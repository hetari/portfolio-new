<script setup lang="ts">
const props = defineProps<{
  text: string;
  start?: boolean;
}>();

const words = textToChars(props.text);
const isHovered = ref(false);

useGsap(gsap => {
  watch(
    () => props.start,
    start => {
      if (!start) return;

      gsap.to(".letter", {
        yPercent: 100,
        ease: "power4.inOut",
        duration: 0.7,
        stagger: {
          each: 0.05,
          from: "random",
        },
      });
    },
    { immediate: true },
  );
});
</script>

<template>
  <!-- <ul
    class="flex flex-col items-center"
    @mouseenter="animateLetters('up', false)"
  > -->
  <!--  <span class="letter"><span>L</span><span>L</span></span> -->
  <p v-for="word in words" class="flex overflow-hidden will-change-transform" data-vitals-ignore>
    <span
      v-for="letter in word"
      class="letter inline-block text-inherit will-change-transform"
      data-vitals-ignore
    >
      <span class="block text-fit will-change-transform" data-vitals-ignore>{{ letter.char }}</span>
      <span class="absolute bottom-full left-0 text-fit will-change-transform" data-vitals-ignore>{{
        letter.char
      }}</span>
    </span>
  </p>
  <!-- </ul> -->
</template>
