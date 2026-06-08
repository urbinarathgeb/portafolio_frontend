<script setup lang="ts">
definePageMeta({
  layout: 'default',
})
</script>

<template>
  <section class="min-h-screen flex items-center justify-center bg-default px-4 py-20">
    <div class="max-w-4xl w-full">
      <div class="hero-enter-1 mb-6">
        <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-elevated border border-border text-sm font-body text-muted">
          <span class="w-2 h-2 rounded-full bg-success animate-pulse-dot"></span>
          Disponible para proyectos
        </span>
      </div>

      <h1 class="hero-enter-2 font-heading text-[clamp(3rem,12vw,8rem)] font-bold leading-[0.9] tracking-tight text-highlighted">
        Hola, soy
        <span class="gradient-text">Kako.</span>
      </h1>

      <p class="hero-enter-3 mt-8 text-xl md:text-2xl font-body text-muted max-w-2xl">
        Desarrollador frontend especializado en crear experiencias web modernas y performantes.
      </p>

      <div class="hero-enter-4 mt-12 flex flex-wrap gap-3">
        <span class="px-4 py-2 rounded-lg bg-elevated border border-border text-sm font-body text-toned">Vue.js</span>
        <span class="px-4 py-2 rounded-lg bg-elevated border border-border text-sm font-body text-toned">Nuxt</span>
        <span class="px-4 py-2 rounded-lg bg-elevated border border-border text-sm font-body text-toned">TypeScript</span>
        <span class="px-4 py-2 rounded-lg bg-elevated border border-border text-sm font-body text-toned">Tailwind CSS</span>
      </div>

      <div class="hero-enter-5 mt-12 flex flex-wrap gap-4">
        <UButton
          label="Ver proyectos"
          size="lg"
          to="/projects"
        />
        <UButton
          label="Sobre mí"
          size="lg"
          variant="outline"
          to="/about"
        />
      </div>
    </div>
  </section>
</template>
