<script setup lang="ts">
const { profile } = useProfile()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="flex flex-wrap items-center justify-between gap-3 px-[clamp(16px,4vw,44px)] pb-[26px] pt-[18px] font-mono text-[11px] uppercase tracking-[0.06em] text-dim">
    <span>© {{ year }} {{ profile.name }} {{ profile.lastname }} · 33.4489°S 70.6693°W</span>
    <span>Hecho con Nuxt · sitio estático</span>
    <NuxtLink to="/#inicio" class="transition-colors hover:text-lime">
      Volver arriba ↑
    </NuxtLink>
  </footer>
</template>
