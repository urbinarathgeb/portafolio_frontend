<script setup lang="ts">
const route = useRoute()

const sectionName = computed(() => {
  const path = route.path
  if (path === '/') return null
  if (path === '/about') return 'SOBRE MÍ'
  if (path === '/projects') return 'PROYECTOS'
  if (path.startsWith('/projects/')) return 'PROYECTO'
  if (path === '/experience') return 'EXPERIENCIA'
  if (path === '/technologies') return 'STACK'
  if (path === '/contact') return 'CONTACTO'
  return null
})
</script>

<template>
  <div
    v-if="sectionName"
    class="fixed bottom-16 left-[5vw] z-40 max-md:left-4 max-md:bottom-4"
  >
    <span class="font-mono text-m font-medium tracking-[0.2em] uppercase text-muted block -rotate-90 origin-left translate-y-[2em]">
      {{ sectionName }}
    </span>
  </div>
</template>