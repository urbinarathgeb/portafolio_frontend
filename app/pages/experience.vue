<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

const { experiences } = useExperience()
</script>

<template>
  <section class="relative min-h-screen py-32 px-[5vw] max-w-[1400px] mx-auto overflow-hidden max-md:py-24 max-md:px-6">
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
      <span class="font-heading text-[clamp(5rem,18vw,11rem)] font-bold tracking-[-0.08em] leading-[0.85] stroke-text opacity-5 select-none whitespace-nowrap">
        EXPERIENCIA
      </span>
    </div>

    <div class="relative z-10 mb-24 max-md:mb-16">
      <span class="block font-body text-sm font-medium tracking-[0.15em] uppercase text-muted mb-6">
        Experiencia Profesional
      </span>
      <h1 class="font-heading text-[clamp(3rem,10vw,6rem)] font-bold tracking-[-0.04em] leading-[0.9] mb-8">
        <span class="gradient-text">Experiencia</span>
      </h1>
      <div class="gradient-divider mt-8" />
    </div>

    <ExperienceTimeline :experiences="experiences" />
  </section>
</template>
