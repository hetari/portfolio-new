<script setup lang="ts">
useHead({
  titleTemplate: titleChunk => {
    return titleChunk
      ? `${titleChunk} | Ebraheem Portfolio`
      : "Ebraheem — Multi-disciplinary Designer & Developer";
  },
  meta: [
    {
      name: "description",
      content:
        "Ebraheem's professional portfolio showcasing expertise in digital design, creative development, and functional digital experiences.",
    },
    {
      name: "keywords",
      content: "Ebraheem, Portfolio, Designer, Developer, Creative Tech, UI/UX",
    },
    { name: "author", content: "Ebraheem" },
    { name: "viewport", content: "width=device-width, initial-scale=1.0" },
    { name: "theme-color", content: "#000000" },
    // Open Graph
    { property: "og:type", content: "website" },
    {
      property: "og:title",
      content: "Ebraheem — Multi-disciplinary Designer & Developer",
    },
    {
      property: "og:description",
      content:
        "Explore the portfolio of Ebraheem, a designer and developer focused on creating premium digital experiences.",
    },
    { property: "og:site_name", content: "Ebraheem Portfolio" },
    // Twitter
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Ebraheem — Multi-disciplinary Designer & Developer",
    },
    {
      name: "twitter:description",
      content:
        "Explore the portfolio of Ebraheem, a designer and developer focused on creating premium digital experiences.",
    },
  ],
});
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
