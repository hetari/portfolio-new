<script setup lang="ts">
const props = defineProps<{
  text: string;
  // as: keyof HTMLElementTagNameMap;
}>();

const words = textToChars(props.text);
const isHovered = ref(false);

useGsap(gsap => {
  gsap.to(".letter", {
    yPercent: 100,
    ease: "power4.inOut",
    duration: 0.7,
    delay: 0.5,
    stagger: {
      each: 0.05,
      from: "random",
    },
  });
});
</script>

<template>
  <!-- <ul
    class="flex flex-col items-center"
    @mouseenter="animateLetters('up', false)"
  > -->
  <!--  <span class="letter"><span>L</span><span>L</span></span> -->
  <p v-for="word in words" class="flex overflow-hidden">
    <span v-for="letter in word" class="letter inline-block text-inherit">
      <span class="block text-fit">{{ letter.char }}</span>
      <span class="absolute bottom-full left-0 text-fit">{{ letter.char }}</span>
    </span>
  </p>
  <!-- </ul> -->
</template>
