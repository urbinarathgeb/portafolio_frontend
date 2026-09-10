<script setup lang="ts">
const { experiences } = useExperience()
</script>

<template>
  <section id="experiencia" class="relative px-[5vw] py-28 overflow-hidden max-md:px-6 max-md:py-20">
    <StrokeText text="EXPERIENCIA" text-size="clamp(4rem,14vw,9rem)" />

    <div class="relative z-10 max-w-[1400px] mx-auto">
      <SectionHeading eyebrow="Experiencia" title="Dónde he trabajado y aprendido" />
      <ExperienceTimeline :experiences="experiences" />
    </div>
  </section>
</template>
