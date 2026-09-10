<script setup lang="ts">
const { profile } = useProfile()
</script>

<template>
  <!-- ~78vh: deja asomar la sección siguiente -->
  <section id="inicio" class="relative min-h-[78dvh] w-full flex items-center px-[5vw] pt-10 pb-10 overflow-hidden max-md:px-6">
    <!-- Glow radial atmosférico -->
    <div class="absolute -top-[10%] -right-[10%] w-[60vw] h-[60vw] glow-radial pointer-events-none" />

    <StrokeText text="DEVELOPER" text-size="clamp(4rem,14vw,10rem)" />

    <!-- Contenido principal -->
    <div class="relative z-10 max-w-[900px]">
      <!-- Badge -->
      <div class="hero-enter-1 inline-flex items-center gap-2 mb-6">
        <span class="w-1.5 h-1.5 rounded-full bg-success-500 animate-pulse-dot" />
        <span class="font-body text-[11px] font-semibold tracking-[0.2em] uppercase text-toned">
          {{ profile.availability ? 'DISPONIBLE' : 'NO DISPONIBLE' }}
        </span>
      </div>

      <!-- Título -->
      <h1 class="hero-enter-2 font-heading text-[clamp(5rem,18vw,11rem)] font-black leading-[0.8] tracking-[-0.04em] text-highlighted mb-8">
        HOLA,<br>
        SOY <span class="gradient-text font-black">JAVIER</span>
      </h1>

      <!-- CTAs -->
      <div class="hero-enter-3 flex items-center gap-8 flex-wrap">
        <NuxtLink to="/#proyectos" class="cta-primary">
          Ver proyectos
        </NuxtLink>
        <NuxtLink to="/#sobre-mi" class="cta-secondary">
          Conocer más
          <UIcon name="i-lucide-arrow-right" class="text-base" />
        </NuxtLink>
      </div>
    </div>

    <!-- Descripción esquina inferior derecha -->
    <div class="hero-enter-4 absolute bottom-10 right-[5vw] max-w-[320px] text-right z-10 max-lg:hidden">
      <p class="font-body text-sm font-normal leading-relaxed text-muted">
        {{ profile.heroDescription }}
      </p>
    </div>
  </section>
</template>
