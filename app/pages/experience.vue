<script setup lang="ts">
definePageMeta({
  layout: 'default',
})
</script>

<template>
  <section class="min-h-screen flex items-center justify-center bg-default px-4 py-20">
    <div class="max-w-4xl w-full section-enter">
      <div class="mb-4">
        <span class="font-body text-sm tracking-[0.1em] uppercase text-muted">04 — Experiencia</span>
      </div>

      <h1 class="font-heading text-[clamp(2.5rem,8vw,6rem)] font-bold leading-[0.9] tracking-tight text-highlighted">
        <span class="gradient-text">Experiencia</span>
      </h1>

      <div class="gradient-divider mt-6 mb-12" />

      <div class="space-y-8">
        <div class="p-6 rounded-lg bg-elevated border border-border">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
            <h3 class="text-xl font-heading font-bold text-highlighted">Desarrollador Frontend</h3>
            <span class="text-sm font-body text-muted">2023 — Presente</span>
          </div>
          <p class="text-toned font-body">Empresa placeholder</p>
          <p class="text-sm text-muted font-body mt-2">
            Descripción del rol y responsabilidades. Sección en construcción.
          </p>
        </div>

        <div class="p-6 rounded-lg bg-elevated border border-border">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
            <h3 class="text-xl font-heading font-bold text-highlighted">Desarrollador Web</h3>
            <span class="text-sm font-body text-muted">2021 — 2023</span>
          </div>
          <p class="text-toned font-body">Empresa placeholder</p>
          <p class="text-sm text-muted font-body mt-2">
            Descripción del rol y responsabilidades. Sección en construcción.
          </p>
        </div>
      </div>

      <div class="mt-12">
        <h2 class="text-2xl font-heading font-bold text-highlighted mb-6">Tecnologías</h2>
        <div class="flex flex-wrap gap-3">
          <span class="px-4 py-2 rounded-lg bg-elevated border border-border text-sm font-body text-toned">Vue.js</span>
          <span class="px-4 py-2 rounded-lg bg-elevated border border-border text-sm font-body text-toned">Nuxt</span>
          <span class="px-4 py-2 rounded-lg bg-elevated border border-border text-sm font-body text-toned">TypeScript</span>
          <span class="px-4 py-2 rounded-lg bg-elevated border border-border text-sm font-body text-toned">Tailwind CSS</span>
          <span class="px-4 py-2 rounded-lg bg-elevated border border-border text-sm font-body text-toned">React</span>
          <span class="px-4 py-2 rounded-lg bg-elevated border border-border text-sm font-body text-toned">Node.js</span>
        </div>
      </div>
    </div>
  </section>
</template>
