<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

const toast = useToast()
const { profile, error } = useProfile()

useSeoMeta({
  title: () => profile.value?.name ? `Portafolio — ${profile.value.name}` : 'Portafolio — Developer',
  ogTitle: () => profile.value?.name ? `Portafolio — ${profile.value.name}` : 'Portafolio — Developer',
  description: () => profile.value?.heroDescription || 'Portafolio profesional desarrollado con Nuxt 4.',
  ogDescription: () => profile.value?.heroDescription || 'Portafolio profesional desarrollado con Nuxt 4.',
  ogImage: '/images/og-image.svg',
  twitterCard: 'summary_large_image',
})

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

    <StrokeText text="DEVELOPER" textSize="clamp(4rem,14vw,10rem)" />

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
        SOY <span class="gradient-text font-black">JAVIER</span>
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
        {{ profile?.heroDescription || 'Construyo productos web rápidos, limpios y escalables. Del diseño de base de datos a la interfaz que se ve viva.' }}
      </p>
    </div>
  </section>
</template>

<style scoped>
</style>