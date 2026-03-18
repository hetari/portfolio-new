import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  modules: [
    "@nuxtjs/color-mode",
    "@vueuse/nuxt",
    "v-gsap-nuxt",
    "@nuxt/image",
    "@nuxt/hints",
    "@nuxt/a11y",
  ],

  css: ["./app/assets/css/main.css"],

  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ["@vue/devtools-core", "@vue/devtools-kit"],
    },
  },
});
