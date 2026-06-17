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
  <article class="relative flex flex-col items-center gap-8 py-12">
    <!-- Imagen flotando detrás del headline -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[clamp(280px,55vw,500px)] rounded-lg overflow-hidden opacity-40 pointer-events-none select-none -z-0 image-glow">
      <img
        :src="image"
        :alt="`${title} — ${subtitle}`"
        class="block w-full h-auto aspect-[3/2] object-cover"
      />
    </div>

    <!-- Headline encima -->
    <div class="relative z-10 flex flex-col items-center">
      <span class="headline-filled">{{ title }}</span>
      <span class="headline-stroke">{{ subtitle }}</span>
    </div>

    <!-- CTA -->
    <div class="relative z-10">
      <NuxtLink
        :to="`/projects/${projectId}`"
        class="group inline-flex items-center gap-3 font-body font-medium text-sm tracking-[0.1em] uppercase text-highlighted hover:text-primary transition-colors"
      >
        <span>Ver caso de estudio</span>
        <span class="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
      </NuxtLink>
    </div>

    <!-- Tech stack -->
    <div v-if="techStack.length" class="relative z-10 flex flex-wrap items-center justify-center gap-2">
      <span class="px-3 py-1 rounded-full bg-elevated border border-border text-xs font-mono uppercase tracking-wide text-muted">Tech Stack</span>
      <span
        v-for="tech in techStack"
        :key="tech"
        class="px-3 py-1 rounded-full bg-elevated border border-border text-xs font-mono uppercase tracking-wide text-primary"
      >
        {{ tech }}
      </span>
    </div>
  </article>
</template>

<style scoped>
.headline-filled {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: clamp(2.5rem, 10vw, 9rem);
  line-height: clamp(2rem, 9vw, 8rem);
  letter-spacing: -0.04em;
  color: var(--ui-text-highlighted);
}

.headline-stroke {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: clamp(2rem, 8vw, 7rem);
  line-height: clamp(1.5rem, 7vw, 6rem);
  letter-spacing: -0.04em;
  color: transparent;
  -webkit-text-stroke: 2px var(--ui-text-highlighted);
  margin-top: -0.5rem;
}

.image-glow {
  border: 2px solid var(--ui-primary);
  box-shadow: 0 0 30px 5px color-mix(in srgb, var(--ui-primary) 40%, transparent);
}
</style>
