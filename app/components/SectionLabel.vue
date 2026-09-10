<script setup lang="ts">
const route = useRoute()
const current = useCurrentSection()

const sectionName = computed(() => {
  if (route.path.startsWith('/projects/')) return 'Proyecto'
  if (!current.value || current.value === 'inicio') return null
  return SECTIONS.find((s) => s.id === current.value)?.label ?? null
})
</script>

<template>
  <div
    v-if="sectionName"
    class="hidden md:block fixed bottom-16 left-[5vw] z-40"
    aria-hidden="true"
  >
    <span class="font-mono text-xs font-medium tracking-[0.2em] uppercase text-muted block -rotate-90 origin-left translate-y-[2em]">
      {{ sectionName }}
    </span>
  </div>
</template>
