<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

useSeoMeta({
  title: 'Proyectos — Kako',
  ogTitle: 'Proyectos — Kako',
  description: 'Explorá los proyectos que he desarrollado, desde apps web hasta sistemas completos.',
  ogDescription: 'Explorá los proyectos que he desarrollado, desde apps web hasta sistemas completos.',
})

const { projects, pending, error } = useProjects()

const activeProject = ref<number | null>(null)

const currentProject = computed(() => {
  if (!projects.value.length || activeProject.value === null) return null
  return projects.value.find((p) => p.id === activeProject.value) ?? projects.value[0] ?? null
})

watch(projects, (newProjects) => {
  if (newProjects.length && activeProject.value === null) {
    activeProject.value = newProjects[0].id
  }
}, { immediate: true })

const navItems = computed(() =>
  projects.value.map((project, index) => ({
    id: project.id,
    number: String(index + 1).padStart(2, '0'),
  })),
)

const transitionKey = computed(() => activeProject.value)

function handleSelect(id: number) {
  activeProject.value = id
}
</script>

<template>
  <div class="page-projects-wrapper">
    <section class="relative min-h-screen flex justify-center items-center overflow-hidden">
      <StrokeText text="PROYECTOS" />

      <template v-if="pending">
        <p class="text-muted animate-pulse">Cargando proyectos...</p>
      </template>
      <template v-else-if="error">
        <p class="text-error">Error al cargar los proyectos.</p>
      </template>
      <template v-else-if="currentProject">
        <ProjectsNav
          :items="navItems"
          :active-id="activeProject"
          @select="handleSelect"
        />
        <div class="relative z-10 w-full max-w-3xl mx-auto px-[5vw] py-20 pl-24 max-md:pl-[5vw] section-enter">
          <Transition name="project-fade" mode="out-in">
            <ProjectCard
              :key="transitionKey"
              :title="currentProject.title"
              :subtitle="currentProject.subtitle"
              :image="currentProject.imagePreview ?? '/images/project-placeholder.svg'"
              :project-id="currentProject.id"
              :is-frontend="currentProject.isFrontend"
              :is-backend="currentProject.isBackend"
              :tech-stack="currentProject.techStack ?? []"
            />
          </Transition>
        </div>
      </template>
    </section>
  </div>
</template>

<style scoped>
.project-fade-enter-active,
.project-fade-leave-active {
  transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.project-fade-enter-from {
  opacity: 0;
  transform: scale(0.98);
  filter: blur(2px);
}

.project-fade-leave-to {
  opacity: 0;
  transform: scale(1.02);
  filter: blur(2px);
}
</style>