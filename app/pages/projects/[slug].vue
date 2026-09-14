<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

const route = useRoute()
const { project } = useProject(route.params.slug as string)

// Proyecto inexistente → página de error global con 404 real
if (!project.value) {
  throw createError({ statusCode: 404, statusMessage: 'Proyecto no encontrado', fatal: true })
}

usePageSeo({
  title: () => (project.value ? `${project.value.title} ${project.value.subtitle}` : 'Proyecto'),
  description: () => project.value?.description ?? 'Caso de estudio.',
})

const meta = computed(() => {
  const p = project.value
  if (!p) return []
  return [p.role, String(p.year), p.status].filter(Boolean) as string[]
})
</script>

<template>
  <section v-if="project" class="relative min-h-screen bg-default overflow-hidden">
    <StrokeText text="PROYECTO" />

    <article class="relative z-10 w-full max-w-3xl mx-auto px-[5vw] md:px-0 py-24 section-enter">
      <!-- Volver -->
      <NuxtLink
        to="/#proyectos"
        class="inline-flex items-center gap-2 text-sm font-body text-muted hover:text-primary transition-colors mb-12"
      >
        <span aria-hidden="true">&larr;</span>
        <span>Volver a proyectos</span>
      </NuxtLink>

      <!-- Encabezado -->
      <header class="mb-8">
        <h1 class="font-heading font-black text-[clamp(2rem,5vw,3.5rem)] leading-[0.95] tracking-[-0.02em] text-highlighted">
          {{ project.title }}
          <span class="block gradient-text text-[clamp(1.5rem,4vw,2.5rem)] mt-1">{{ project.subtitle }}</span>
        </h1>

        <div class="flex flex-wrap items-center gap-3 mt-6">
          <span
            class="px-3 py-1 rounded-full border text-xs font-mono uppercase tracking-wide"
            :class="project.kind === 'client' ? 'bg-primary border-primary text-white' : 'bg-primary/5 border-primary/40 text-primary'"
          >
            {{ PROJECT_KIND_LABEL[project.kind] }}
          </span>
          <span class="text-sm font-body text-muted">{{ meta.join(' · ') }}</span>
        </div>
      </header>

      <!-- Imagen -->
      <div class="w-full rounded-lg overflow-hidden border border-border image-glow mb-10">
        <NuxtImg
          :src="project.imagePreview"
          :alt="`Captura de ${project.title} ${project.subtitle}`"
          class="block w-full h-auto aspect-[3/2] object-cover object-top"
          format="webp"
          width="1500"
          height="1000"
        />
      </div>

      <!-- Resumen -->
      <p class="text-lg font-body leading-relaxed text-toned mb-8">
        {{ project.description }}
      </p>

      <!-- Stack -->
      <ul class="flex flex-wrap items-center gap-2 mb-8" aria-label="Tecnologías">
        <li
          v-for="tech in project.techStack"
          :key="tech"
          class="px-3 py-1 rounded-full bg-elevated border border-border text-xs font-mono text-toned"
        >
          {{ tech }}
        </li>
      </ul>

      <!-- Links -->
      <div class="flex flex-wrap gap-3">
        <a
          v-if="project.links.demo"
          :href="project.links.demo"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-white text-sm font-body font-medium hover:glow-shadow-primary hover:-translate-y-0.5 transition-all"
        >
          <UIcon name="i-lucide-external-link" class="w-4 h-4" />
          <span>Ver demo</span>
        </a>
        <a
          v-if="project.links.repo"
          :href="project.links.repo"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-elevated border border-border text-sm font-body text-highlighted hover:border-primary hover:text-primary transition-colors"
        >
          <UIcon name="i-lucide-github" class="w-4 h-4" />
          <span>{{ project.links.repoBackend ? 'Repo frontend' : 'Repositorio' }}</span>
        </a>
        <a
          v-if="project.links.repoBackend"
          :href="project.links.repoBackend"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-elevated border border-border text-sm font-body text-highlighted hover:border-primary hover:text-primary transition-colors"
        >
          <UIcon name="i-lucide-github" class="w-4 h-4" />
          <span>Repo backend</span>
        </a>
      </div>

      <!-- Caso de estudio -->
      <div class="gradient-divider my-16" />

      <div class="space-y-14">
        <section>
          <h2 class="case-heading">Contexto</h2>
          <div class="border-l-2 border-primary pl-6">
            <p class="text-base font-body leading-relaxed text-toned">{{ project.caseStudy.context }}</p>
          </div>
        </section>

        <section>
          <h2 class="case-heading">Qué construí</h2>
          <p class="text-base font-body leading-relaxed text-muted">{{ project.caseStudy.built }}</p>
        </section>

        <section>
          <h2 class="case-heading">Decisiones</h2>
          <ol class="space-y-4">
            <li
              v-for="(decision, i) in project.caseStudy.decisions"
              :key="decision.title"
              class="p-6 rounded-xl bg-elevated border border-border"
            >
              <div class="flex items-start gap-3 mb-3">
                <span class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-mono text-sm font-bold shrink-0" aria-hidden="true">
                  {{ i + 1 }}
                </span>
                <h3 class="font-body font-semibold text-base text-highlighted leading-snug pt-1">{{ decision.title }}</h3>
              </div>
              <p class="font-body text-sm leading-relaxed text-muted">{{ decision.body }}</p>
            </li>
          </ol>
        </section>

        <section>
          <h2 class="case-heading">Resultado</h2>
          <ul class="space-y-3">
            <li
              v-for="item in project.caseStudy.result"
              :key="item"
              class="flex gap-3 font-body text-base leading-relaxed text-muted"
            >
              <span class="mt-2.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" aria-hidden="true" />
              <span>{{ item }}</span>
            </li>
          </ul>
        </section>

        <section v-if="project.caseStudy.learnings">
          <h2 class="case-heading">Qué haría distinto</h2>
          <p class="text-base font-body leading-relaxed text-muted">{{ project.caseStudy.learnings }}</p>
        </section>
      </div>
    </article>
  </section>
</template>

<style scoped>
.case-heading {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--ui-primary);
  margin-bottom: 1rem;
}
</style>
