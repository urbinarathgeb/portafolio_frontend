<script setup lang="ts">
import type { Experience } from '~/types/experience'

interface Props {
  experiences: Experience[]
}

defineProps<Props>()
</script>

<template>
  <div class="flex flex-col">
    <div 
      v-for="(experience, index) in experiences" 
      :key="experience.id"
      class="opacity-0 animate-fade-up"
      :style="{ animationDelay: `${index * 0.1}s` }"
    >
      <ExperienceCard :experience="experience" />
    </div>
  </div>
</template>
