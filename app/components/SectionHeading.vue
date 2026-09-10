<script setup lang="ts">
defineProps<{
  eyebrow: string
  title: string
}>()
</script>

<template>
  <header class="mb-12 max-md:mb-8">
    <span class="font-mono text-xs tracking-[0.3em] uppercase text-primary">
      {{ eyebrow }}
    </span>
    <h2 class="font-heading text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-[-0.03em] leading-[1.1] text-highlighted mt-3">
      {{ title }}
    </h2>
  </header>
</template>
