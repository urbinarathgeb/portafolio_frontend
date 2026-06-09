<script setup lang="ts">
import type { Experience } from '~/composables/useExperience'

interface Props {
  experience: Experience
}

const props = defineProps<Props>()
</script>

<template>
  <div class="flex items-baseline justify-between py-12 border-b border-white/10 dark:border-white/5 transition-all duration-500 cursor-default hover:pl-4 group">
    <div class="flex flex-row items-baseline gap-12 max-lg:flex-col max-lg:items-start max-lg:gap-6">
      <span class="year-text font-heading text-[clamp(5rem,12vw,11rem)] font-bold tracking-[-0.04em] leading-[0.85] max-md:text-[clamp(4rem,15vw,6rem)]">
        {{ experience.year }}
      </span>
      <div class="flex flex-col gap-3">
        <h3 class="font-heading text-[clamp(1.5rem,3vw,2.5rem)] font-bold tracking-[-0.02em] uppercase text-highlighted leading-tight max-md:text-[clamp(1.25rem,5vw,1.75rem)]">
          {{ experience.role }}
        </h3>
        <p class="font-mono text-sm font-medium tracking-[0.15em] uppercase text-primary mt-2">
          {{ experience.company }}
          <span class="text-muted mx-2">//</span>
          <span class="text-muted">{{ experience.location }}</span>
        </p>
        <p class="font-body text-[0.9375rem] leading-relaxed text-default max-w-[500px] mt-2">
          {{ experience.description }}
        </p>
      </div>
    </div>
    <div class="flex items-center gap-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 max-lg:opacity-100 max-lg:mt-4">
      <span 
        v-for="tech in experience.technologies" 
        :key="tech"
        class="font-mono text-xs font-medium tracking-wider uppercase px-4 py-2 bg-elevated text-toned"
      >
        {{ tech }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.year-text {
  color: transparent;
  -webkit-text-stroke: 1px var(--ui-text-muted);
  transition: all 0.5s ease-out;
}

.group:hover .year-text {
  -webkit-text-stroke: 1px var(--ui-primary);
  color: rgba(232, 54, 109, 0.05);
  text-shadow: 0 0 30px rgba(232, 54, 109, 0.2);
}

@media (max-width: 1024px) {
  .group {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .group {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
  
  .group:hover {
    padding-left: 0.5rem;
  }
}
</style>