<script setup lang="ts">
interface ProjectCardProps {
  title: string
  subtitle: string
  image: string
  projectId: number
  techStack?: string[]
}

withDefaults(defineProps<ProjectCardProps>(), {
  techStack: () => [],
})
</script>

<template>
  <article class="relative min-h-screen flex items-center justify-center overflow-hidden bg-default">
    <div class="absolute inset-0 flex flex-col items-center justify-center opacity-10 z-0 pointer-events-none select-none" aria-hidden="true">
      <span class="headline-filled">{{ title }}</span>
      <span class="headline-stroke">{{ subtitle }}</span>
    </div>

    <div class="relative z-10 flex flex-col items-center">
      <div class="image-wrapper rounded-lg border-2 border-primary overflow-hidden w-[clamp(280px,55vw,500px)] max-h-80">
        <img
          :src="image"
          :alt="`${title} — ${subtitle}`"
          class="block w-full h-full object-cover"
        />
      </div>

      <div class="relative z-20 flex flex-col items-center -mt-8">
        <span class="headline-filled drop-shadow-headline">{{ title }}</span>
        <span class="headline-stroke">{{ subtitle }}</span>
      </div>

      <NuxtLink
        :to="`/projects/${projectId}`"
        class="mt-10 px-12 py-5 font-body font-medium text-sm tracking-[0.1em] uppercase text-inverted bg-highlighted border-none cursor-pointer transition-all duration-300 ease-out hover:scale-[1.03] hover:opacity-90 active:scale-[0.98]"
      >
        Ver caso de estudio
      </NuxtLink>
    </div>

    <div v-if="techStack.length" class="absolute bottom-8 right-8 z-20 flex flex-col items-end gap-2">
      <span class="px-3 py-1 rounded bg-elevated text-primary font-body font-medium text-[10px] tracking-[0.1em] uppercase">Tech Stack</span>
      <span class="font-body font-medium text-sm tracking-[0.1em] uppercase text-muted">{{ techStack.join(' // ') }}</span>
    </div>
  </article>
</template>

<style scoped>
.headline-filled {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: clamp(3rem, 12vw, 11.25rem);
  line-height: clamp(2.5rem, 11vw, 10rem);
  letter-spacing: -0.04em;
  color: var(--ui-text-highlighted);
}

.headline-stroke {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: clamp(3rem, 12vw, 11.25rem);
  line-height: clamp(2.5rem, 11vw, 10rem);
  letter-spacing: -0.04em;
  color: transparent;
  -webkit-text-stroke: 2px var(--ui-text-highlighted);
}

.drop-shadow-headline {
  text-shadow: 0 25px 25px rgba(0, 0, 0, 0.15);
}

.image-wrapper {
  box-shadow: 0 0 30px 5px color-mix(in srgb, var(--ui-primary) 40%, transparent);
}
</style>
