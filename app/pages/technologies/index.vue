<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

const toast = useToast()
const { technologies, pending, error } = useTechnologies()

useSeoMeta({
  title: 'Stack Tecnológico — Kako',
  ogTitle: 'Stack Tecnológico — Kako',
  description: 'Tecnologías con las que trabajo: frontend, backend, herramientas y más.',
  ogDescription: 'Tecnologías con las que trabajo: frontend, backend, herramientas y más.',
})

watch(error, (err) => {
  if (err) {
    toast.add({ title: 'Error', description: 'No se pudieron cargar las tecnologías.', color: 'error' })
  }
})
</script>

<template>
  <section class="relative min-h-screen flex items-center justify-center py-16 px-[5vw] max-w-[1400px] mx-auto overflow-hidden max-md:py-12 max-md:px-6">
    <!-- Glow atmosférico top-right -->
    <div class="absolute -top-[10%] -right-[10%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] glow-radial pointer-events-none" />

    <StrokeText text="STACK" textSize="clamp(5rem,18vw,11rem)" />

    <template v-if="error">
      <div class="relative z-10 w-full text-center py-20">
        <p class="text-error font-body">Error al cargar las tecnologías.</p>
      </div>
    </template>
    <template v-else>
      <!-- Grid de cards -->
      <div class="relative z-10 grid grid-cols-12 gap-6 max-lg:grid-cols-6 max-md:grid-cols-1 max-md:gap-4">
        <TechnologiesTechnologyCard
          v-for="(tech, index) in technologies"
          :key="tech.id"
          :technology="tech"
          :index="index"
        />
      </div>
    </template>
  </section>
</template>
