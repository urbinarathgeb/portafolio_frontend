<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

const route = useRoute()
const id = route.params.slug as string

const { project, pending, error } = useProject(id)

useSeoMeta({
  title: () => project.value ? `${project.value.title} — Kako` : 'Proyecto — Kako',
  ogTitle: () => project.value ? `${project.value.title} — Kako` : 'Proyecto — Kako',
  description: () => project.value?.description || 'Detalle del proyecto.',
  ogDescription: () => project.value?.description || 'Detalle del proyecto.',
})

const initials = computed(() => {
  if (!project.value?.user) return ''
  return `${project.value.user.name[0]}${project.value.user.lastname[0]}`
})
</script>

<template>
  <AppLoader v-if="pending" />
  <template v-else>
    <section class="relative min-h-screen bg-default overflow-hidden">
    <StrokeText text="PROYECTO" />

    <!-- Error -->
    <div v-if="error" class="relative z-10 flex items-center justify-center min-h-screen">
      <p class="text-error">Error al cargar el proyecto.</p>
    </div>

    <!-- Proyecto -->
    <div v-else-if="project" class="relative z-10 w-full max-w-3xl mx-auto px-[5vw] md:px-0 py-24 section-enter">
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

      <!-- Frontend / Backend tags -->
      <div v-if="project.isFrontend || project.isBackend" class="flex flex-wrap items-center gap-2 mb-4">
        <span
          v-if="project.isFrontend"
          class="px-3 py-1 rounded-full border text-xs font-mono uppercase tracking-wide bg-primary/5 border-primary/40 text-primary"
        >
          Frontend
        </span>
        <span
          v-if="project.isBackend"
          class="px-3 py-1 rounded-full border text-xs font-mono uppercase tracking-wide bg-primary/5 border-primary/40 text-primary"
        >
          Backend
        </span>
      </div>

      <!-- Tech stack -->
      <div v-if="project.techStack?.length" class="flex flex-wrap items-center gap-2 mb-10">
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
          v-if="project.githubURLFront"
          :href="project.githubURLFront"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-elevated border border-border text-sm font-body text-highlighted hover:border-primary hover:text-primary transition-colors"
        >
          <UIcon name="i-lucide-github" class="w-4 h-4" />
          <span>Frontend</span>
        </a>
        <a
          v-if="project.githubURLBack"
          :href="project.githubURLBack"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-elevated border border-border text-sm font-body text-highlighted hover:border-primary hover:text-primary transition-colors"
        >
          <UIcon name="i-lucide-github" class="w-4 h-4" />
          <span>Backend</span>
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

      <!-- Caso de Estudio -->
      <template v-if="project.caseStudy">
        <!-- Divisor decorativo -->
        <div class="gradient-divider my-16" />

        <div class="space-y-14">
          <!-- Título -->
          <h3 class="font-heading font-bold text-[clamp(1.75rem,4vw,2.75rem)] leading-[0.9] tracking-[-0.02em] text-highlighted">
            {{ project.caseStudy.title }}
          </h3>

          <!-- Desafío -->
          <div v-if="project.caseStudy.challenge">
            <h4 class="font-mono text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4">El Desafío</h4>
            <div class="border-l-2 border-primary pl-6">
              <p class="text-base font-body leading-relaxed text-toned italic">{{ project.caseStudy.challenge }}</p>
            </div>
          </div>

          <!-- Solución -->
          <div v-if="project.caseStudy.solution">
            <h4 class="font-mono text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4">La Solución</h4>
            <p class="text-base font-body leading-relaxed text-muted">{{ project.caseStudy.solution }}</p>
          </div>

          <!-- Highlights -->
          <div v-if="project.caseStudy.highlights?.length">
            <div class="gradient-divider mb-8" />
            <h4 class="font-mono text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-6">Características Técnicas</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                v-for="(item, i) in project.caseStudy.highlights"
                :key="i"
                class="p-6 rounded-xl bg-elevated border border-border hover:border-primary transition-colors duration-300"
              >
                <div class="flex items-center gap-3 mb-3">
                  <span class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-mono text-sm font-bold shrink-0">
                    {{ i + 1 }}
                  </span>
                  <h5 class="font-body font-semibold text-sm text-highlighted leading-tight">{{ item.title }}</h5>
                </div>
                <p class="font-body text-sm leading-relaxed text-muted">{{ item.description }}</p>
              </div>
            </div>
          </div>

          <!-- Impacto -->
          <div v-if="project.caseStudy.impact?.length">
            <div class="gradient-divider mb-8" />
            <h4 class="font-mono text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-6">Impacto y Resultados</h4>
            <div class="space-y-4">
              <div
                v-for="(item, i) in project.caseStudy.impact"
                :key="i"
                class="p-6 rounded-xl bg-elevated border border-border"
              >
                <div class="flex items-baseline gap-3 mb-2">
                  <span class="font-heading font-bold text-4xl text-primary leading-none">{{ item.stat }}</span>
                  <span class="font-body font-semibold text-base text-highlighted">{{ item.subtitle }}</span>
                </div>
                <p class="font-body text-sm text-muted leading-relaxed">{{ item.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </section>
  </template>
</template>
