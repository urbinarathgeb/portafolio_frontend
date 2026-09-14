<script setup lang="ts">
const { projects } = useProjects()
const meta = computed(() => `Índice 01–${String(projects.value.length).padStart(2, '0')}`)
</script>

<template>
  <section id="proyectos" class="border-b border-line">
    <SectionHeader title="Lo que he construido" :meta="meta" />
    <ProjectRow
      v-for="(project, i) in projects"
      :key="project.id"
      :project="project"
      :index="i + 1"
    />
  </section>
</template>
