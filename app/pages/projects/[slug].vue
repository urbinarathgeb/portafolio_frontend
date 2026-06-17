<script setup lang="ts">
const route = useRoute()
const id = route.params.slug as string

const { project, pending, error } = useProject(id)

useHead({
  title: computed(() => project.value ? `${project.value.title} — Kako` : 'Proyecto — Kako'),
})

const initials = computed(() => {
  if (!project.value?.user) return ''
  return `${project.value.user.name[0]}${project.value.user.lastname[0]}`
})
</script>

<template>
  <section class="relative min-h-screen bg-default overflow-hidden">
    <!-- Stroke text pattern: PROYECTO × 3 -->
    <div class="fixed top-[3vh] right-[5vw] pointer-events-none select-none z-0 max-md:hidden">
      <div class="font-heading text-[clamp(4rem,12vw,8rem)] font-bold tracking-[-0.08em] leading-[0.85] stroke-text opacity-[0.15] whitespace-nowrap">
        PROYECTO
      </div>
      <div class="font-heading text-[clamp(4rem,12vw,8rem)] font-bold tracking-[-0.08em] leading-[0.85] stroke-text opacity-[0.08] whitespace-nowrap -mt-[0.3em]">
        PROYECTO
      </div>
      <div class="font-heading text-[clamp(4rem,12vw,8rem)] font-bold tracking-[-0.08em] leading-[0.85] stroke-text opacity-[0.03] whitespace-nowrap -mt-[0.3em]">
        PROYECTO
      </div>
    </div>

    <!-- Loading -->
    <div v-if="pending" class="relative z-10 flex items-center justify-center min-h-screen">
      <p class="text-muted animate-pulse">Cargando proyecto...</p>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="relative z-10 flex items-center justify-center min-h-screen">
      <p class="text-error">Error al cargar el proyecto.</p>
    </div>

    <!-- Proyecto -->
    <div v-else-if="project" class="relative z-10 w-full max-w-3xl mx-auto px-[5vw] py-24 section-enter">
      <!-- Volver -->
      <NuxtLink
        to="/projects"
        class="inline-flex items-center gap-2 text-sm font-body text-muted hover:text-primary transition-colors mb-12"
      >
        <span class="transition-transform duration-300">&larr;</span>
        <span>Volver a proyectos</span>
      </NuxtLink>

      <!-- Header -->
      <div class="mb-8">
        <h1 class="font-heading font-black text-[clamp(2rem,5vw,3.5rem)] leading-[0.9] tracking-[-0.02em] text-highlighted mb-3">
          {{ project.title }}
        </h1>
        <h2 class="font-heading font-black text-[clamp(1.5rem,4vw,2.5rem)] leading-[0.85] tracking-[-0.02em] gradient-text">
          {{ project.subtitle }}
        </h2>
      </div>

      <!-- Meta -->
      <div class="flex items-center gap-4 mb-10">
        <div
          v-if="initials"
          class="w-10 h-10 rounded-full bg-elevated border border-border flex items-center justify-center text-xs font-mono text-primary"
        >
          {{ initials }}
        </div>
        <div class="flex flex-col">
          <span class="text-sm font-body text-highlighted">{{ project.user.name }} {{ project.user.lastname }}</span>
          <span class="text-xs font-mono text-muted uppercase tracking-wide">{{ new Date(project.createdAt).toLocaleDateString('es-AR', { year: 'numeric', month: 'long' }) }}</span>
        </div>
      </div>

      <!-- Imagen -->
      <div class="w-full rounded-lg overflow-hidden border border-border image-glow mb-10">
        <img
          :src="project.imagePreview ?? '/images/project-placeholder.svg'"
          :alt="`${project.title} — ${project.subtitle}`"
          class="block w-full h-auto aspect-[16/9] object-cover"
        />
      </div>

      <!-- Descripción -->
      <div class="mb-10">
        <p class="text-base font-body leading-relaxed text-muted whitespace-pre-line">{{ project.description }}</p>
      </div>

      <!-- Tech stack -->
      <div v-if="project.techStack?.length" class="flex flex-wrap items-center gap-2 mb-10">
        <span class="px-3 py-1 rounded-full bg-elevated border border-border text-xs font-mono uppercase tracking-wide text-muted">Tech Stack</span>
        <span
          v-for="tech in project.techStack"
          :key="tech"
          class="px-3 py-1 rounded-full bg-elevated border border-border text-xs font-mono uppercase tracking-wide text-primary"
        >
          {{ tech }}
        </span>
      </div>

      <!-- Links -->
      <div class="flex flex-wrap gap-3">
        <a
          v-if="project.githubURL"
          :href="project.githubURL"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-elevated border border-border text-sm font-body text-highlighted hover:border-primary hover:text-primary transition-colors"
        >
          <UIcon name="i-lucide-github" class="w-4 h-4" />
          <span>Código</span>
        </a>
        <a
          v-if="project.deployURL"
          :href="project.deployURL"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-white text-sm font-body font-medium hover:glow-shadow-primary hover:-translate-y-0.5 transition-all"
        >
          <UIcon name="i-lucide-external-link" class="w-4 h-4" />
          <span>Demo</span>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.image-glow {
  box-shadow: 0 0 30px 5px color-mix(in srgb, var(--ui-primary) 25%, transparent);
}
</style>
