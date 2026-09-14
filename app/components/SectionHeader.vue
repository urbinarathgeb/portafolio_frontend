<script setup lang="ts">
defineProps<{
  title: string
  meta?: string
}>()
</script>

<template>
  <div class="flex flex-wrap items-baseline justify-between gap-4 px-[clamp(16px,4vw,44px)] pb-[clamp(16px,2.5vw,26px)] pt-[clamp(26px,4.5vw,52px)]">
    <h2 class="font-display text-[clamp(26px,4.8vw,58px)] font-extrabold uppercase leading-none tracking-[-0.04em]">
      {{ title }}
    </h2>
    <span v-if="meta" class="eyebrow text-dim">{{ meta }}</span>
  </div>
</template>
