<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

const { technologies } = useTechnologies()
</script>

<template>
  <section class="relative min-h-screen flex items-center py-16 px-[5vw] max-w-[1400px] mx-auto overflow-hidden max-md:py-12 max-md:px-6">
    <!-- Glow atmosférico top-right -->
    <div class="absolute -top-[10%] -right-[10%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] glow-radial pointer-events-none" />

    <!-- Stroke text pattern: STACK × 3 con opacidad descendente -->
    <div class="fixed top-[3vh] right-[5vw] pointer-events-none select-none z-0 max-md:right-4">
      <div class="font-heading text-[clamp(5rem,18vw,11rem)] font-bold tracking-[-0.08em] leading-[0.85] stroke-text opacity-[0.15] whitespace-nowrap">
        STACK
      </div>
      <div class="font-heading text-[clamp(5rem,18vw,11rem)] font-bold tracking-[-0.08em] leading-[0.85] stroke-text opacity-[0.08] whitespace-nowrap -mt-[0.3em]">
        STACK
      </div>
      <div class="font-heading text-[clamp(5rem,18vw,11rem)] font-bold tracking-[-0.08em] leading-[0.85] stroke-text opacity-[0.03] whitespace-nowrap -mt-[0.3em]">
        STACK
      </div>
    </div>

    <!-- Grid de cards -->
    <div class="relative z-10 grid grid-cols-12 gap-6 max-lg:grid-cols-6 max-md:grid-cols-1 max-md:gap-4">
      <TechnologiesTechnologyCard
        v-for="(tech, index) in technologies"
        :key="tech.id"
        :technology="tech"
        :index="index"
      />
    </div>
  </section>
</template>

<style scoped>
.glow-radial {
  background: radial-gradient(
    circle,
    rgba(232, 54, 109, 0.08) 0%,
    rgba(240, 117, 117, 0.05) 30%,
    rgba(255, 175, 2, 0.03) 60%,
    transparent 80%
  );
  filter: blur(60px);
  will-change: transform;
}
</style>
