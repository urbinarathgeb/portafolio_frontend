<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

const toast = useToast()
const { profile, error } = useProfile()

useSeoMeta({
  title: () => profile.value?.name ? `Sobre Mí — ${profile.value.name}` : 'Sobre Mí — Developer',
  ogTitle: () => profile.value?.name ? `Sobre Mí — ${profile.value.name}` : 'Sobre Mí — Developer',
  description: () => profile.value?.bio || 'Conoce más sobre mi trayectoria y habilidades.',
  ogDescription: () => profile.value?.bio || 'Conoce más sobre mi trayectoria y habilidades.',
})

watch(error, (err) => {
  if (err) {
    toast.add({ title: 'Error', description: 'No se pudo cargar el perfil.', color: 'error' })
  }
})
</script>

<template>
  <section class="relative min-h-screen flex items-center justify-center bg-default px-[5vw] py-20 overflow-hidden max-md:px-6">
    <StrokeText text="SOBRE MÍ" />

    <div class="relative z-10 max-w-[1200px] w-full section-enter">
      <!-- Glow radial atmosférico detrás de las cards -->
      <div class="absolute top-[15%] right-[-8%] w-[350px] h-[350px] glow-radial-about pointer-events-none z-0 max-md:hidden" />

      <div class="grid grid-cols-12 gap-10 items-stretch max-md:grid-cols-1 max-md:gap-10">
        <!-- Tagline full-width: rompe la estructura de columnas -->
        <div class="col-span-12 max-md:col-span-1">
          <span class="font-mono text-xs tracking-[0.3em] uppercase text-primary">
            {{ profile?.title }}
          </span>
          <h2 class="font-heading text-[clamp(2.5rem,6vw,4.5rem)] font-bold tracking-[-0.03em] leading-[0.9] mt-3 gradient-text">
            {{ profile?.tagline }}
          </h2>
        </div>

        <!-- Columna izquierda: bio + chips -->
        <div class="col-span-6 max-md:col-span-1 h-full flex flex-col justify-between">
          <p class="text-lg text-muted font-body leading-relaxed max-w-full whitespace-pre-line">
            {{ profile?.bio }}
          </p>

          <div class="flex flex-wrap gap-3 mt-6">
            <span class="px-4 py-2 rounded-full bg-elevated border border-border text-sm font-body text-toned">
              Resolutivo
            </span>
            <span class="px-4 py-2 rounded-full bg-elevated border border-border text-sm font-body text-toned">
              Detallista
            </span>
            <span class="px-4 py-2 rounded-full bg-elevated border border-border text-sm font-body text-toned">
              Autodidacta
            </span>
            <span class="px-4 py-2 rounded-full bg-elevated border border-border text-sm font-body text-toned">
              Colaborativo
            </span>
          </div>
        </div>

        <!-- Columna derecha: cards 3-col grid -->
        <div class="col-span-6 max-md:col-span-1">
          <div class="grid grid-cols-3 gap-3 h-full">
            <!-- Hero card: 2×2 -->
            <div class="col-span-2 row-span-2 p-6 rounded-lg bg-elevated border border-border flex flex-col justify-between glow-shadow-primary">
              <div class="text-5xl font-heading font-bold text-primary">3+</div>
              <div class="text-sm text-toned font-body">Años de<br />experiencia</div>
            </div>
            <!-- 15+ proyectos: 1×1 -->
            <div class="col-span-1 row-span-1 p-4 rounded-lg bg-elevated border border-border flex flex-col justify-between glow-shadow-secondary">
              <div class="text-2xl font-heading font-bold text-secondary">15+</div>
              <div class="text-xs text-toned font-body">Proyectos</div>
            </div>
            <!-- 100% remoto: 1×1 -->
            <div class="col-span-1 row-span-1 p-4 rounded-lg bg-elevated border border-border flex flex-col justify-between glow-shadow-secondary">
              <div class="text-2xl font-heading font-bold text-success">100%</div>
              <div class="text-xs text-toned font-body">Remoto</div>
            </div>
            <!-- ∞ curiosidad: full-width bottom row -->
            <div class="col-span-3 row-span-1 p-4 rounded-lg bg-elevated border border-border flex items-center justify-between glow-shadow-accent">
              <div class="text-2xl font-heading font-bold text-accent">∞</div>
              <div class="text-xs text-toned font-body text-right">Curiosidad<br />insaciable</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>