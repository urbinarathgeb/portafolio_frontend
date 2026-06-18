<script setup lang="ts">
import type { Experience } from '~/types/experience'

interface Props {
  experience: Experience
}

defineProps<Props>()
</script>

<template>
  <div class="flex items-baseline py-12 border-b border-border transition-all duration-500 cursor-default hover:pl-4 group max-md:py-8 max-md:hover:pl-2">
    <span class="year-text text-transparent transition-all duration-500 ease-out font-bold font-stroke text-[clamp(5rem,12vw,11rem)] tracking-[-0.04em] leading-[0.85] mr-12 max-md:mr-6 max-md:text-[clamp(4rem,15vw,6rem)]">
      {{ experience.year }}
    </span>
    <div class="flex flex-col gap-3">
      <h3 class="font-heading text-[clamp(1.5rem,3vw,2.5rem)] font-bold tracking-[-0.02em] uppercase text-highlighted leading-tight max-md:text-[clamp(1.25rem,5vw,1.75rem)]">
        {{ experience.role }}
      </h3>
      <div class="flex items-center gap-2 flex-wrap font-mono text-sm font-medium tracking-[0.15em] uppercase text-primary mt-2 max-md:flex-col max-md:items-start max-md:gap-1">
        <span>{{ experience.company }}</span>
        <span class="text-muted max-md:hidden">//</span>
        <span class="text-muted">{{ experience.location }}</span>
      </div>
      <p class="font-body text-[0.9375rem] leading-relaxed text-default max-w-[500px] mt-2">
        {{ experience.description }}
      </p>
      <div class="flex flex-wrap gap-2 mt-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 max-md:opacity-100">
        <span 
          v-for="tech in experience.technologies" 
          :key="tech"
          class="font-mono text-xs font-medium tracking-wider uppercase px-4 py-2 bg-elevated text-toned"
        >
          {{ tech }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.year-text {
  -webkit-text-stroke: 1px var(--ui-text-muted);
}

.group:hover .year-text {
  -webkit-text-stroke: 1px var(--ui-primary);
  color: color-mix(in srgb, var(--ui-primary) 5%, transparent);
  text-shadow: 0 0 30px color-mix(in srgb, var(--ui-primary) 20%, transparent);
}
</style>