<script setup lang="ts">
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
  <section class="relative min-h-screen flex justify-center items-center overflow-hidden">
    <!-- Stroke text pattern: PROYECTOS × 3 con opacidad descendente -->
    <div class="fixed top-[3vh] right-[5vw] pointer-events-none select-none z-0 max-md:hidden">
      <div class="font-heading text-[clamp(4rem,12vw,8rem)] font-bold tracking-[-0.08em] leading-[0.85] stroke-text opacity-[0.15] whitespace-nowrap">
        PROYECTOS
      </div>
      <div class="font-heading text-[clamp(4rem,12vw,8rem)] font-bold tracking-[-0.08em] leading-[0.85] stroke-text opacity-[0.08] whitespace-nowrap -mt-[0.3em]">
        PROYECTOS
      </div>
      <div class="font-heading text-[clamp(4rem,12vw,8rem)] font-bold tracking-[-0.08em] leading-[0.85] stroke-text opacity-[0.03] whitespace-nowrap -mt-[0.3em]">
        PROYECTOS
      </div>
    </div>

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
        <Transition name="project-slide" mode="out-in">
          <ProjectCard
            :key="transitionKey"
            :title="currentProject.title"
            :subtitle="currentProject.subtitle"
            :image="currentProject.imagePreview ?? '/images/project-placeholder.svg'"
            :project-id="currentProject.id"
            :tech-stack="currentProject.techStack ?? []"
          />
        </Transition>
      </div>
    </template>
  </section>
</template>

<style scoped>
.project-slide-enter-active {
  transition: all 150ms ease-out;
}

.project-slide-leave-active {
  transition: all 110ms ease-in;
}

.project-slide-enter-from {
  opacity: 0;
  transform: translateY(24px);
}

.project-slide-leave-to {
  opacity: 0;
  transform: translateY(-16px);
}
</style>
