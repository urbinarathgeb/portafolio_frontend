<script setup lang="ts">
const { projects } = useProjects()
</script>

<template>
  <section id="proyectos" class="relative px-[5vw] py-28 overflow-hidden max-md:px-6 max-md:py-20">
    <StrokeText text="PROYECTOS" />

    <div class="relative z-10 max-w-[1200px] mx-auto">
      <SectionHeading eyebrow="Proyectos" title="Lo que he construido" />

      <!-- Todos visibles a la vez; el destacado ocupa el ancho completo -->
      <div class="grid gap-6 md:grid-cols-2">
        <ProjectGridCard
          v-for="project in projects"
          :key="project.id"
          :project="project"
          :featured="project.isFeatured"
        />
      </div>
    </div>
  </section>
</template>
