<script setup lang="ts">
definePageMeta({
  layout: 'default',
})
</script>

<template>
  <section class="min-h-screen flex items-center justify-center bg-default px-4 py-20">
    <div class="max-w-4xl w-full section-enter">
      <div class="mb-4">
        <span class="font-body text-sm tracking-[0.1em] uppercase text-muted">02 — Sobre mí</span>
      </div>

      <h1 class="font-heading text-[clamp(2.5rem,8vw,6rem)] font-bold leading-[0.9] tracking-tight text-highlighted">
        Sobre
        <span class="gradient-text">mí</span>
      </h1>

      <div class="gradient-divider mt-6 mb-12" />

      <div class="grid md:grid-cols-2 gap-12">
        <div>
          <p class="text-lg text-muted font-body leading-relaxed">
            Sección en construcción. Aquí irá la información personal, trayectoria y enfoque profesional.
          </p>
        </div>

        <div class="flex flex-col gap-4">
          <div class="p-6 rounded-lg bg-elevated border border-border">
            <div class="text-3xl font-heading font-bold text-primary">3+</div>
            <div class="text-sm text-toned font-body mt-1">Años de experiencia</div>
          </div>
          <div class="p-6 rounded-lg bg-elevated border border-border">
            <div class="text-3xl font-heading font-bold text-primary">15+</div>
            <div class="text-sm text-toned font-body mt-1">Proyectos completados</div>
          </div>
          <div class="p-6 rounded-lg bg-elevated border border-border">
            <div class="text-3xl font-heading font-bold text-success">Open</div>
            <div class="text-sm text-toned font-body mt-1">Disponible para proyectos</div>
          </div>
        </div>
      </div>

      <div class="mt-12 flex flex-wrap gap-3">
        <span class="px-4 py-2 rounded-full bg-elevated border border-border text-sm font-body text-toned">Resolutivo</span>
        <span class="px-4 py-2 rounded-full bg-elevated border border-border text-sm font-body text-toned">Detallista</span>
        <span class="px-4 py-2 rounded-full bg-elevated border border-border text-sm font-body text-toned">Autodidacta</span>
        <span class="px-4 py-2 rounded-full bg-elevated border border-border text-sm font-body text-toned">Colaborativo</span>
      </div>
    </div>
  </section>
</template>
