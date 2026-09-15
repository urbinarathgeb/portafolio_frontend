<script setup lang="ts">
import type { ProjectData } from '~/data/schemas'

const props = defineProps<{
  project: ProjectData
  index: number
}>()

const badge = computed(() =>
  [PROJECT_KIND_LABEL[props.project.kind], props.project.status].filter(Boolean).join(' · '),
)
</script>

<template>
  <!-- Toda la fila es clickeable (after:inset-0 en el link) e invierte a lima al pasar -->
  <article class="group relative flex flex-wrap items-stretch border-t border-line text-paper transition-colors duration-200 focus-within:bg-lime focus-within:text-ink hover:bg-lime hover:text-ink">
    <div class="grid min-w-0 flex-[2_1_340px] content-start gap-[15px] px-[clamp(16px,4vw,44px)] py-[clamp(20px,3.4vw,42px)]">
      <div class="flex flex-wrap items-center gap-3.5">
        <span class="font-mono text-[clamp(32px,4.4vw,54px)] font-semibold leading-[0.9] opacity-30" aria-hidden="true">
          {{ String(index).padStart(2, '0') }}
        </span>
        <span class="border border-current px-[9px] py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.08em]">
          {{ badge }}
        </span>
      </div>

      <h3 class="font-display text-[clamp(26px,3.6vw,44px)] font-bold leading-none tracking-[-0.035em]">
        {{ project.title }} {{ project.subtitle }}
      </h3>

      <p class="max-w-[48ch] text-base leading-[1.55] opacity-80 text-pretty">
        {{ project.description }}
      </p>

      <ul class="flex flex-wrap gap-1.5 font-mono text-[11px] uppercase tracking-[0.04em]" aria-label="Tecnologías">
        <li v-for="tech in project.techStack" :key="tech" class="border border-current px-[9px] py-[5px] opacity-70">
          {{ tech }}
        </li>
      </ul>

      <NuxtLink
        :to="`/projects/${project.id}`"
        class="mt-0.5 inline-flex min-h-11 w-fit items-center font-mono text-sm font-semibold uppercase tracking-[0.04em] underline underline-offset-[6px] after:absolute after:inset-0 focus-visible:outline-none"
      >
        Ver caso de estudio →
      </NuxtLink>
    </div>

    <!-- Captura enmarcada: con aire alrededor para que las filas no se vean pegadas -->
    <div class="flex min-w-0 flex-[1_1_270px] items-center border-line p-[clamp(16px,2.6vw,32px)] max-md:border-t md:border-l">
      <div class="w-full overflow-hidden border border-line bg-ink-2 transition-colors group-hover:border-ink/40 group-focus-within:border-ink/40">
        <NuxtImg
          :src="project.imagePreview"
          :alt="`Captura de ${project.title} ${project.subtitle}`"
          class="block aspect-[3/2] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          format="webp"
          loading="lazy"
          width="900"
          height="600"
        />
      </div>
    </div>
  </article>
</template>
