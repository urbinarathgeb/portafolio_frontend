<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

const route = useRoute()
const { project } = useProject(route.params.slug as string)
const { projects } = useProjects()

// Proyecto inexistente → página de error global con 404 real
if (!project.value) {
  throw createError({ statusCode: 404, statusMessage: 'Proyecto no encontrado', fatal: true })
}

usePageSeo({
  title: () => (project.value ? `${project.value.title} ${project.value.subtitle}` : 'Proyecto'),
  description: () => project.value?.description ?? 'Caso de estudio.',
})

const index = computed(() => projects.value.findIndex((p) => p.id === project.value?.id) + 1)

const facts = computed(() => {
  const p = project.value
  if (!p) return []
  return [
    { label: 'Rol', value: p.role },
    { label: 'Año', value: String(p.year) },
    ...(p.status ? [{ label: 'Estado', value: p.status }] : []),
  ]
})

const sections = computed(() => {
  const c = project.value?.caseStudy
  if (!c) return []
  return [
    { id: 'contexto', label: 'Contexto' },
    { id: 'construi', label: 'Qué construí' },
    { id: 'decisiones', label: 'Decisiones' },
    { id: 'resultado', label: 'Resultado' },
    ...(c.learnings ? [{ id: 'aprendizajes', label: 'Qué haría distinto' }] : []),
  ]
})

const num = (id: string) => String(sections.value.findIndex((s) => s.id === id) + 1).padStart(2, '0')
</script>

<template>
  <article v-if="project" class="border-b border-line">
    <!-- Encabezado -->
    <header class="border-b border-line px-[clamp(16px,4vw,44px)] pb-[clamp(24px,4vw,44px)] pt-[clamp(28px,5vw,64px)]">
      <NuxtLink
        to="/#proyectos"
        class="mb-[clamp(20px,3vw,32px)] inline-flex min-h-11 items-center font-mono text-xs uppercase tracking-[0.08em] text-mute transition-colors hover:text-lime"
      >
        ← Volver a proyectos
      </NuxtLink>

      <div class="eyebrow mb-4 flex items-center gap-3 text-dim">
        <span>Caso {{ String(index).padStart(2, '0') }}</span>
        <span class="h-px flex-1 bg-line" aria-hidden="true" />
        <span
          class="border px-[9px] py-1 font-semibold"
          :class="project.kind === 'client' ? 'border-lime bg-lime text-ink' : 'border-line-strong text-paper'"
        >
          {{ PROJECT_KIND_LABEL[project.kind] }}
        </span>
      </div>

      <h1 class="font-display text-[clamp(40px,8vw,112px)] font-extrabold uppercase leading-[0.86] tracking-[-0.05em]">
        {{ project.title }}
        <span class="block font-medium tracking-[-0.035em] text-dim">{{ project.subtitle }}</span>
      </h1>

      <p class="mt-[clamp(20px,3vw,32px)] max-w-[52ch] text-[clamp(17px,2vw,21px)] leading-normal text-soft text-pretty">
        {{ project.description }}
      </p>

      <dl class="mt-[clamp(22px,3.4vw,36px)] flex flex-wrap gap-x-[clamp(28px,5vw,64px)] gap-y-3.5 border-t border-line pt-3.5 font-mono">
        <div v-for="fact in facts" :key="fact.label" class="grid content-start gap-1">
          <dt class="eyebrow text-dim">{{ fact.label }}</dt>
          <dd class="text-[13px] text-paper">{{ fact.value }}</dd>
        </div>
        <div class="grid min-w-0 content-start gap-1">
          <dt class="eyebrow text-dim">Stack</dt>
          <dd class="text-[13px] text-paper">{{ project.techStack.join(' · ') }}</dd>
        </div>
      </dl>

      <div class="mt-[clamp(22px,3.4vw,36px)] flex flex-wrap gap-2.5">
        <a
          v-if="project.links.demo"
          :href="project.links.demo"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex min-h-[54px] items-center bg-lime px-[26px] font-mono text-sm font-semibold uppercase tracking-[0.04em] text-ink transition-colors hover:bg-paper"
        >
          Ver demo ↗
        </a>
        <a
          v-if="project.links.repo"
          :href="project.links.repo"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex min-h-[54px] items-center border border-line-strong px-[22px] font-mono text-sm uppercase tracking-[0.04em] text-paper transition-colors hover:border-lime hover:text-lime"
        >
          {{ project.links.repoBackend ? 'Repo frontend ↗' : 'Repositorio ↗' }}
        </a>
        <a
          v-if="project.links.repoBackend"
          :href="project.links.repoBackend"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex min-h-[54px] items-center border border-line-strong px-[22px] font-mono text-sm uppercase tracking-[0.04em] text-paper transition-colors hover:border-lime hover:text-lime"
        >
          Repo backend ↗
        </a>
      </div>
    </header>

    <!-- Imagen -->
    <div class="border-b border-line bg-ink-2 p-[clamp(16px,4vw,44px)]">
      <NuxtImg
        :src="project.imagePreview"
        :alt="`Captura de ${project.title} ${project.subtitle}`"
        class="mx-auto block aspect-[3/2] w-full max-w-[1100px] border border-line object-cover object-top"
        format="webp"
        width="1500"
        height="1000"
      />
    </div>

    <!-- Caso de estudio: filas tipo ficha (etiqueta a la izquierda, contenido a la derecha) -->
    <div class="px-[clamp(16px,4vw,44px)] py-[clamp(12px,2vw,24px)]">
      <section id="contexto" class="case-row">
        <h2 class="case-label">{{ num('contexto') }} / Contexto</h2>
        <p class="text-[clamp(17px,2vw,20px)] leading-relaxed text-paper text-pretty">{{ project.caseStudy.context }}</p>
      </section>

      <section id="construi" class="case-row">
        <h2 class="case-label">{{ num('construi') }} / Qué construí</h2>
        <p class="text-base leading-relaxed text-soft text-pretty">{{ project.caseStudy.built }}</p>
      </section>

      <section id="decisiones" class="case-row">
        <h2 class="case-label">{{ num('decisiones') }} / Decisiones</h2>
        <ol class="grid gap-px border border-line bg-line">
          <li
            v-for="(decision, i) in project.caseStudy.decisions"
            :key="decision.title"
            class="grid gap-2.5 bg-ink p-[clamp(16px,2.4vw,24px)]"
          >
            <span class="font-mono text-xs font-semibold text-lime" aria-hidden="true">D{{ i + 1 }}</span>
            <h3 class="font-display text-[clamp(19px,2.2vw,24px)] font-bold leading-snug tracking-[-0.02em]">{{ decision.title }}</h3>
            <p class="text-[15px] leading-relaxed text-soft text-pretty">{{ decision.body }}</p>
          </li>
        </ol>
      </section>

      <section id="resultado" class="case-row">
        <h2 class="case-label">{{ num('resultado') }} / Resultado</h2>
        <ul class="grid gap-3">
          <li v-for="item in project.caseStudy.result" :key="item" class="flex gap-3 text-base leading-relaxed text-soft">
            <span class="mt-1 font-mono text-xs text-lime" aria-hidden="true">◆</span>
            <span>{{ item }}</span>
          </li>
        </ul>
      </section>

      <section v-if="project.caseStudy.learnings" id="aprendizajes" class="case-row">
        <h2 class="case-label">{{ num('aprendizajes') }} / Qué haría distinto</h2>
        <p class="text-base leading-relaxed text-soft text-pretty">{{ project.caseStudy.learnings }}</p>
      </section>
    </div>

    <div class="border-t border-line px-[clamp(16px,4vw,44px)] py-[clamp(20px,3vw,32px)]">
      <NuxtLink
        to="/#proyectos"
        class="inline-flex min-h-[54px] items-center bg-paper px-[26px] font-mono text-sm font-semibold uppercase tracking-[0.04em] text-ink transition-colors hover:bg-lime"
      >
        ← Ver todos los proyectos
      </NuxtLink>
    </div>
  </article>
</template>

<style scoped>
.case-row {
  display: grid;
  gap: 1rem;
  padding-block: clamp(22px, 3.4vw, 40px);
  border-top: 1px solid var(--color-line);
}

.case-row:first-child {
  border-top: 0;
}

@media (min-width: 768px) {
  .case-row {
    grid-template-columns: 14rem minmax(0, 1fr);
    gap: 2rem;
  }
}

.case-label {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-lime);
}

.case-row > :not(.case-label) {
  max-width: 68ch;
}
</style>
