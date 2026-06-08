<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

const route = useRoute()
const projectId = route.params.slug as string

const { project, pending, error } = useProject(projectId)
</script>

<template>
  <section class="min-h-screen flex items-center justify-center bg-default px-4 py-20">
    <div class="max-w-4xl w-full section-enter">
      <template v-if="pending">
        <p class="text-muted animate-pulse">Cargando proyecto...</p>
      </template>

      <template v-else-if="error || !project">
        <div class="text-center">
          <h1 class="font-heading text-6xl font-bold text-highlighted mb-4">Proyecto no encontrado</h1>
          <p class="text-muted font-body mb-8">El proyecto que buscas no existe o fue removido.</p>
          <UButton
            label="Volver a proyectos"
            size="lg"
            to="/projects"
          />
        </div>
      </template>

      <template v-else>
        <div class="mb-4">
          <span class="font-body text-sm tracking-[0.1em] uppercase text-muted">03 — Proyectos</span>
        </div>

        <h1 class="font-heading text-[clamp(2.5rem,8vw,6rem)] font-bold leading-[0.9] tracking-tight text-highlighted mb-4">
          {{ project.title }}
        </h1>

        <p class="text-xl text-toned font-body mb-8">{{ project.subtitle }}</p>

        <div class="gradient-divider mb-12" />

        <div class="mb-12">
          <h2 class="text-2xl font-heading font-bold text-highlighted mb-4">Descripción</h2>
          <p class="text-muted font-body leading-relaxed">{{ project.description }}</p>
        </div>

        <div class="mb-12">
          <h2 class="text-2xl font-heading font-bold text-highlighted mb-4">Tecnologías</h2>
          <div class="flex flex-wrap gap-3">
            <span class="px-4 py-2 rounded-lg bg-elevated border border-border text-sm font-body text-toned">
              Vue.js
            </span>
            <span class="px-4 py-2 rounded-lg bg-elevated border border-border text-sm font-body text-toned">
              Nuxt
            </span>
            <span class="px-4 py-2 rounded-lg bg-elevated border border-border text-sm font-body text-toned">
              TypeScript
            </span>
          </div>
        </div>

        <div class="flex flex-wrap gap-4">
          <UButton
            v-if="project.githubURL"
            label="Ver código"
            size="lg"
            :to="project.githubURL"
            target="_blank"
          />
          <UButton
            v-if="project.deployURL"
            label="Ver demo"
            size="lg"
            variant="outline"
            :to="project.deployURL"
            target="_blank"
          />
          <UButton
            label="Volver a proyectos"
            size="lg"
            variant="ghost"
            to="/projects"
          />
        </div>
      </template>
    </div>
  </section>
</template>
