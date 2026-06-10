<script setup lang="ts">
definePageMeta({
  layout: 'default',
})
</script>

<template>
  <section class="relative min-h-screen flex items-center justify-center bg-default px-[5vw] py-20 overflow-hidden max-md:px-6">
    <!-- Stroke text pattern: SOBRE MÍ × 3 con opacidad descendente -->
    <div class="fixed top-[3vh] right-[5vw] pointer-events-none select-none z-0 max-md:right-4">
      <div class="font-heading text-[clamp(4rem,12vw,8rem)] font-bold tracking-[-0.08em] leading-[0.85] stroke-text opacity-[0.15] whitespace-nowrap">
        SOBRE MÍ
      </div>
      <div class="font-heading text-[clamp(4rem,12vw,8rem)] font-bold tracking-[-0.08em] leading-[0.85] stroke-text opacity-[0.08] whitespace-nowrap -mt-[0.3em]">
        SOBRE MÍ
      </div>
      <div class="font-heading text-[clamp(4rem,12vw,8rem)] font-bold tracking-[-0.08em] leading-[0.85] stroke-text opacity-[0.03] whitespace-nowrap -mt-[0.3em]">
        SOBRE MÍ
      </div>
    </div>

    <div class="relative z-10 max-w-[1200px] w-full section-enter">
      <!-- Glow radial atmosférico detrás de las cards -->
      <div class="absolute top-[15%] right-[-8%] w-[350px] h-[350px] glow-radial-about pointer-events-none z-0 max-md:hidden" />

      <div class="grid grid-cols-12 gap-10 items-stretch max-md:grid-cols-1 max-md:gap-10">
        <!-- Tagline full-width: rompe la estructura de columnas -->
        <div class="col-span-12 max-md:col-span-1">
          <span class="font-mono text-xs tracking-[0.3em] uppercase text-primary">
            Desarrollador Full-Stack
          </span>
          <h2 class="font-heading text-[clamp(2.5rem,6vw,4.5rem)] font-bold tracking-[-0.03em] leading-[0.9] text-highlighted mt-3">
            CÓDIGO.
            <span class="gradient-text">DISEÑO.</span>
            INNOVAR.
          </h2>
        </div>

        <!-- Columna izquierda: bio + chips -->
        <div class="col-span-6 max-md:col-span-1 h-full flex flex-col justify-between">
          <p class="text-lg text-muted font-body leading-relaxed max-w-full">
            Puenteo la brecha entre la ingeniería compleja y el diseño emotivo. Mi trabajo vive en la intersección de la precisión técnica y la narrativa visual, creando experiencias digitales que son tan performantes como hermosas.
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
.glow-radial-about {
  background: radial-gradient(
    circle,
    rgba(232, 54, 109, 0.06) 0%,
    rgba(240, 117, 117, 0.04) 30%,
    rgba(255, 175, 2, 0.02) 60%,
    transparent 80%
  );
  filter: blur(60px);
  will-change: transform;
}
</style>