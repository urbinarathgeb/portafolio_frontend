<script setup lang="ts">
const { profile } = useProfile()

// "CÓDIGO. DISEÑO. INNOVAR." → una palabra por línea
const taglineLines = computed(() => profile.value.tagline.split(/(?<=\.)\s+/))
const bio = computed(() => profile.value.bio.split(/\n{2,}/))

const TRAITS = ['Resolutivo', 'Detallista', 'Autodidacta', 'Colaborativo']
</script>

<template>
  <section id="sobre-mi" class="border-b border-line">
    <div class="flex flex-wrap items-stretch">
      <div class="min-w-0 flex-[1_1_320px] px-[clamp(16px,4vw,44px)] py-[clamp(26px,4.5vw,52px)]">
        <p class="eyebrow mb-4 text-dim">Sobre mí</p>
        <h2 class="mb-5 font-display text-[clamp(34px,6.6vw,82px)] font-extrabold uppercase leading-[0.88] tracking-[-0.045em]">
          <span
            v-for="(line, i) in taglineLines"
            :key="line"
            class="block"
            :class="{ 'font-medium tracking-[-0.03em] text-dim': i === 1, 'text-lime': i === 2 }"
          >{{ line }}</span>
        </h2>
        <ul class="flex flex-wrap gap-1.5 font-mono text-[11px] uppercase tracking-[0.06em] text-soft">
          <li v-for="trait in TRAITS" :key="trait" class="border border-line-strong px-[9px] py-[5px]">{{ trait }}</li>
        </ul>
      </div>

      <div class="grid min-w-0 flex-[1_1_320px] content-start gap-5 border-line px-[clamp(16px,4vw,44px)] py-[clamp(26px,4.5vw,52px)] max-md:border-t md:border-l">
        <p
          v-for="(paragraph, i) in bio"
          :key="i"
          class="max-w-[56ch] leading-relaxed text-pretty"
          :class="i === 0 ? 'text-[clamp(17px,2vw,21px)] text-paper' : 'text-base text-soft'"
        >
          {{ paragraph }}
        </p>
      </div>
    </div>
  </section>
</template>
