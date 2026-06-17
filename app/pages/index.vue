<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

const toast = useToast()
const { profile, error } = useProfile()

watch(error, (err) => {
  if (err) {
    toast.add({ title: 'Error', description: 'No se pudo cargar el perfil.', color: 'error' })
  }
})
</script>

<template>
  <section class="relative h-screen w-full flex items-center px-[5vw] overflow-hidden max-md:px-6">
    <!-- Glow radial atmosférico -->
    <div class="absolute -top-[10%] -right-[10%] w-[60vw] h-[60vw] glow-radial pointer-events-none" />

    <!-- Stroke text pattern: DEVELOPER × 3 con opacidad descendente -->
    <div class="fixed top-[3vh] right-[5vw] pointer-events-none select-none z-0 max-md:hidden">
      <div class="font-heading text-[clamp(4rem,14vw,10rem)] font-bold tracking-[-0.08em] leading-[0.85] stroke-text opacity-[0.15] whitespace-nowrap">
        DEVELOPER
      </div>
      <div class="font-heading text-[clamp(4rem,14vw,10rem)] font-bold tracking-[-0.08em] leading-[0.85] stroke-text opacity-[0.08] whitespace-nowrap -mt-[0.3em]">
        DEVELOPER
      </div>
      <div class="font-heading text-[clamp(4rem,14vw,10rem)] font-bold tracking-[-0.08em] leading-[0.85] stroke-text opacity-[0.03] whitespace-nowrap -mt-[0.3em]">
        DEVELOPER
      </div>
    </div>

    <!-- Contenido principal -->
    <div class="relative z-10 max-w-[900px]">
      <!-- Badge -->
      <div class="hero-enter-1 inline-flex items-center gap-2 mb-8">
        <span class="w-1.5 h-1.5 rounded-full bg-success-500 animate-pulse-dot" />
        <span class="font-body text-[11px] font-semibold tracking-[0.2em] uppercase text-toned">
          {{ profile?.availability !== false ? 'DISPONIBLE' : 'NO DISPONIBLE' }}
        </span>
      </div>

      <!-- Título -->
      <h1 class="hero-enter-2 font-heading text-[clamp(5rem,18vw,11rem)] font-black leading-[0.7] tracking-[-0.04em] text-highlighted mb-12">
        HOLA,<br>
        SOY <span class="gradient-text font-black">KAKO</span>
      </h1>

      <!-- CTAs -->
      <div class="hero-enter-3 flex items-center gap-8 flex-wrap">
        <NuxtLink to="/projects" class="cta-primary">
          VER PROYECTOS
        </NuxtLink>
        <NuxtLink to="/about" class="cta-secondary">
          CONOCER MÁS
          <UIcon name="i-lucide-arrow-right" class="text-base" />
        </NuxtLink>
      </div>
    </div>

    <!-- Descripción esquina inferior derecha -->
    <div class="hero-enter-4 absolute bottom-24 right-[5vw] max-w-[320px] text-right z-10 max-lg:hidden">
      <p class="font-body text-sm font-normal leading-relaxed text-muted">
        {{ profile?.heroDescription }}
      </p>
    </div>
  </section>
</template>

<style scoped>
.glow-radial {
  background: radial-gradient(
    circle,
    rgba(232, 54, 109, 0.12) 0%,
    rgba(240, 117, 117, 0.08) 30%,
    rgba(255, 175, 2, 0.04) 60%,
    transparent 80%
  );
  filter: blur(60px);
  will-change: transform;
}

.cta-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2.5rem;
  font-family: var(--font-body);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: white;
  background: var(--color-primary-500);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease-out;
  text-decoration: none;
}

.cta-primary:hover {
  background: var(--color-primary-600);
  box-shadow: 0 0 40px rgba(232, 54, 109, 0.4);
  transform: translateY(-2px);
}

.cta-primary:active {
  transform: translateY(0);
}

.cta-secondary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-body);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--ui-text-toned);
  text-decoration: none;
  transition: all 0.3s ease-out;
}

.cta-secondary:hover {
  color: var(--ui-primary);
}

.cta-secondary:hover :deep(.i-lucide-arrow-right) {
  transform: translateX(4px);
}

.cta-secondary :deep(.i-lucide-arrow-right) {
  transition: transform 0.3s ease-out;
}

@media (max-width: 768px) {
  .cta-primary {
    padding: 0.875rem 2rem;
  }

  .cta-secondary {
    font-size: 11px;
  }
}
</style>