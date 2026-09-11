<script setup lang="ts">
const { technologies } = useTechnologies()
</script>

<template>
  <section id="stack" class="relative px-[5vw] py-28 overflow-hidden max-md:px-6 max-md:py-20">
    <!-- Glow atmosférico top-right -->
    <div class="absolute -top-[10%] -right-[10%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] glow-radial pointer-events-none" />

    <StrokeText text="STACK" text-size="clamp(5rem,18vw,11rem)" />

    <div class="relative z-10 max-w-[1400px] mx-auto">
      <SectionHeading eyebrow="Stack" title="Con qué trabajo" />

      <div class="grid grid-cols-12 gap-6 max-lg:grid-cols-6 max-md:grid-cols-1 max-md:gap-4">
        <TechnologiesTechnologyCard
          v-for="(tech, index) in technologies"
          :key="tech.id"
          :technology="tech"
          :index="index"
        />
      </div>
    </div>
  </section>
</template>
