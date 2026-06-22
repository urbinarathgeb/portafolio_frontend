<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

const toast = useToast()
const { experiences, pending, error } = useExperience()

useSeoMeta({
  title: 'Experiencia — Kako',
  ogTitle: 'Experiencia — Kako',
  description: 'Trayectoria profesional: roles, empresas y proyectos destacados.',
  ogDescription: 'Trayectoria profesional: roles, empresas y proyectos destacados.',
})

watch(error, (err) => {
  if (err) {
    toast.add({ title: 'Error', description: 'No se pudieron cargar las experiencias.', color: 'error' })
  }
})
</script>

<template>
  <section class="relative min-h-screen flex items-center py-32 px-[5vw] max-w-[1400px] mx-auto overflow-hidden max-md:py-24 max-md:px-6">
    <StrokeText text="EXPERIENCIA" textSize="clamp(4rem,14vw,9rem)" />

    <template v-if="pending && !experiences.length">
      <div class="relative z-10 w-full text-center py-20">
        <p class="text-muted animate-pulse font-body">Cargando experiencias...</p>
      </div>
    </template>
    <template v-else-if="error">
      <div class="relative z-10 w-full text-center py-20">
        <p class="text-error font-body">Error al cargar las experiencias.</p>
      </div>
    </template>
    <template v-else>
      <ExperienceTimeline :experiences="experiences" />
    </template>
  </section>
</template>
