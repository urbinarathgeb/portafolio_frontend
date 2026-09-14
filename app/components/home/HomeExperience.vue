<script setup lang="ts">
import type { ExperienceData } from '~/data/schemas'

const { experiences } = useExperience()

const KIND_LABEL: Record<ExperienceData['kind'], string> = {
  project: 'Proyecto',
  education: 'Formación',
  start: 'Inicio',
}

// "Ruta 2024–2026": rango calculado desde los datos
const meta = computed(() => {
  const years = experiences.value.map((e) => e.year)
  const min = Math.min(...years)
  const max = Math.max(...years)
  return min === max ? `Ruta ${max}` : `Ruta ${min}–${max}`
})

const newest = computed(() => Math.max(...experiences.value.map((e) => e.year)))
</script>

<template>
  <section id="experiencia" class="border-b border-line">
    <div class="flex flex-wrap items-baseline justify-between gap-4 px-[clamp(16px,4vw,44px)] pb-[clamp(16px,2.5vw,26px)] pt-[clamp(26px,4.5vw,52px)]">
      <h2 class="font-display text-[clamp(26px,4.8vw,58px)] font-extrabold uppercase leading-none tracking-[-0.04em]">
        Experiencia <span class="font-medium text-dim">&amp; estudios</span>
      </h2>
      <span class="eyebrow text-dim">{{ meta }}</span>
    </div>

    <ol>
      <li
        v-for="item in experiences"
        :key="item.id"
        class="flex flex-wrap items-start gap-x-[clamp(20px,4vw,48px)] gap-y-3.5 border-t border-line px-[clamp(16px,4vw,44px)] py-[clamp(18px,2.6vw,28px)]"
      >
        <div class="grid min-w-0 flex-[0_0_9ch] content-start gap-1.5 font-mono">
          <span class="text-[clamp(15px,1.7vw,18px)] font-semibold" :class="item.year === newest ? 'text-lime' : 'text-mute'">
            {{ item.year }}
          </span>
          <span class="text-[10px] uppercase tracking-[0.1em] text-dim">{{ KIND_LABEL[item.kind] }}</span>
        </div>

        <div class="grid min-w-0 flex-[1_1_320px] content-start gap-2">
          <h3 class="font-display text-[clamp(18px,2.1vw,24px)] font-bold leading-[1.1] tracking-[-0.025em]">{{ item.role }}</h3>
          <span class="font-mono text-xs tracking-[0.04em] text-mute">
            {{ item.company }}<template v-if="item.location"> · {{ item.location }}</template>
          </span>
        </div>

        <p class="min-w-0 max-w-[52ch] flex-[1_1_300px] text-[15px] leading-[1.55] text-soft text-pretty">
          {{ item.description }}
        </p>
      </li>
    </ol>
  </section>
</template>
