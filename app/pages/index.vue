<script setup lang="ts">
import { siteConfig } from "~/lib/site-config";

const container = useTemplateRef<HTMLDivElement>("container");
const text = useTemplateRef<HTMLHeadingElement>("text");

const { $t } = useI18n();
const { style, isReady } = useFitText(text, container);

useHead({
  title: $t(siteConfig.nameKey),
});
</script>

<template>
  <section
    class="grid min-h-dvh grid-rows-[2fr_1fr] bg-muted px-4 py-3"
    aria-label="Portfolio Hero"
    id="hero-section"
    role="region"
  >
    <!-- nav  -->
    <header class="flex w-full items-start justify-between">
      <h1 class="font-heading text-4xl font-medium tracking-tighter text-foreground/80">
        {{ $t(siteConfig.nameKey) }}
      </h1>
      <div class="flex items-center gap-4 text-xl">
        <template v-for="(item, index) in siteConfig.NavItems" :key="index">
          <NuxtLink :href="item.href" class="font-medium">
            {{ $t(item.key) }}
          </NuxtLink>
        </template>
        <!-- CTA -->
        <button
          class="relative cursor-pointer rounded bg-[oklch(0.86_0.19_140)] px-3.5 py-1 font-semibold"
        >
          <span>{{ $t(siteConfig.contactKey) }}</span>
        </button>
      </div>
    </header>
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

  <div id="test">
    The standard Lorem Ipsum passage, used since the 1500s "Lorem ipsum dolor sit amet, consectetur
    adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
    minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
    mollit anim id est laborum." Section 1.10.32 of "de Finibus Bonorum et Malorum", written by
    Cicero in 45 BC "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
    درهمque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
    architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
    aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem
    sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur,
    adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam
    aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis
    suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure
    reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui
    dolorem eum fugiat quo voluptas nulla pariatur?" 1914 translation by H. Rackham "But I must
    explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and
    I will give you a complete account of the system, and expound the actual teachings of the great
    explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or
    avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue
    pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone
    who loves or pursues or desires to obtain pain of itself, because it is pain, but because
  </div>
</template>
