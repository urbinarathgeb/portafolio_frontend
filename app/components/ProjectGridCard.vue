<script setup lang="ts">
import type { ProjectData } from '~/data/schemas'

defineProps<{
  project: ProjectData
  featured?: boolean
}>()

const KIND_LABEL: Record<ProjectData['kind'], string> = {
  client: 'Cliente real',
  own: 'Proyecto propio',
  academic: 'Proyecto académico',
}
</script>

<template>
  <article
    class="group relative flex overflow-hidden rounded-xl border border-border bg-elevated transition-all duration-300 hover:-translate-y-1 hover:border-primary focus-within:border-primary"
    :class="featured ? 'flex-col md:flex-row md:col-span-2' : 'flex-col'"
  >
    <div class="relative overflow-hidden" :class="featured ? 'md:w-3/5' : ''">
      <NuxtImg
        :src="project.imagePreview ?? '/images/project-placeholder.svg'"
        :alt="`Captura de ${project.title}`"
        class="block w-full aspect-[3/2] object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
        format="webp"
        loading="lazy"
        width="1000"
        height="667"
      />
    </div>

    <div class="flex flex-1 flex-col gap-4 p-6" :class="featured ? 'md:w-2/5 md:p-8 md:justify-center' : ''">
      <span
        class="w-fit px-3 py-1 rounded-full border text-xs font-mono uppercase tracking-wide"
        :class="project.kind === 'client' ? 'bg-primary border-primary text-white' : 'bg-primary/5 border-primary/40 text-primary'"
      >
        {{ KIND_LABEL[project.kind] }}
      </span>

      <h3
        class="font-heading font-bold tracking-[-0.02em] leading-tight text-highlighted"
        :class="featured ? 'text-[clamp(1.75rem,3vw,2.5rem)]' : 'text-2xl'"
      >
        {{ project.title }}
        <span class="font-medium text-muted">{{ project.subtitle }}</span>
      </h3>

      <p class="font-body text-sm leading-relaxed text-muted">
        {{ project.description }}
      </p>

      <ul class="flex flex-wrap gap-2" aria-label="Tecnologías">
        <li
          v-for="tech in project.techStack"
          :key="tech"
          class="px-3 py-1 rounded-full bg-default border border-border text-xs font-mono text-toned"
        >
          {{ tech }}
        </li>
      </ul>

      <!-- El link cubre toda la tarjeta (after:inset-0) -->
      <NuxtLink
        :to="`/projects/${project.id}`"
        class="mt-auto inline-flex items-center gap-2 font-body text-sm font-medium text-highlighted transition-colors hover:text-primary after:absolute after:inset-0 focus-visible:outline-none"
      >
        Ver caso de estudio
        <span aria-hidden="true" class="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
      </NuxtLink>
    </div>
  </article>
</template>
