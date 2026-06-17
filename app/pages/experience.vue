<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

const toast = useToast()
const { experiences, pending, error } = useExperience()

watch(error, (err) => {
  if (err) {
    toast.add({ title: 'Error', description: 'No se pudieron cargar las experiencias.', color: 'error' })
  }
})
</script>

<template>
  <section class="relative min-h-screen flex items-center py-32 px-[5vw] max-w-[1400px] mx-auto overflow-hidden max-md:py-24 max-md:px-6">
    <!-- Stroke text pattern: EXPERIENCIA × 3 con opacidad descendente -->
    <div class="fixed top-[3vh] right-[5vw] pointer-events-none select-none z-0 max-md:hidden">
      <div class="font-heading text-[clamp(4rem,14vw,9rem)] font-bold tracking-[-0.08em] leading-[0.85] stroke-text opacity-[0.15] whitespace-nowrap">
        EXPERIENCIA
      </div>
      <div class="font-heading text-[clamp(4rem,14vw,9rem)] font-bold tracking-[-0.08em] leading-[0.85] stroke-text opacity-[0.08] whitespace-nowrap -mt-[0.3em]">
        EXPERIENCIA
      </div>
      <div class="font-heading text-[clamp(4rem,14vw,9rem)] font-bold tracking-[-0.08em] leading-[0.85] stroke-text opacity-[0.03] whitespace-nowrap -mt-[0.3em]">
        EXPERIENCIA
      </div>
    </div>

    <template v-if="error">
      <div class="relative z-10 w-full text-center py-20">
        <p class="text-error font-body">Error al cargar las experiencias.</p>
      </div>
    </template>
    <template v-else>
      <ExperienceTimeline :experiences="experiences" />
    </template>
  </section>
</template>
