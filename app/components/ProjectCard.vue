<script setup lang="ts">
interface ProjectCardProps {
  title: string
  subtitle: string
  image: string
  projectId: number
  isFrontend?: boolean
  isBackend?: boolean
  techStack?: string[]
}

withDefaults(defineProps<ProjectCardProps>(), {
  isFrontend: false,
  isBackend: false,
  techStack: () => [],
})
</script>

<template>
  <article class="relative flex flex-col items-center gap-8 py-12">
    <!-- Imagen flotando detrás del headline -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[clamp(280px,55vw,500px)] rounded-lg overflow-hidden opacity-40 pointer-events-none select-none -z-0 image-glow">
      <NuxtImg
        :src="image"
        :alt="`${title} — ${subtitle}`"
        class="block w-full h-auto aspect-[3/2] object-cover"
        format="webp"
        loading="lazy"
        width="1000"
        height="667"
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

    <!-- Frontend / Backend tags -->
    <div v-if="isFrontend || isBackend" class="relative z-10 flex flex-wrap items-center justify-center gap-2">
      <span
        v-if="isFrontend"
        class="px-3 py-1 rounded-full border text-xs font-mono uppercase tracking-wide bg-primary/5 border-primary/40 text-primary"
      >
        Frontend
      </span>
      <span
        v-if="isBackend"
        class="px-3 py-1 rounded-full border text-xs font-mono uppercase tracking-wide bg-primary/5 border-primary/40 text-primary"
      >
        Backend
      </span>
    </div>

    <!-- Tech stack -->
    <div v-if="techStack.length" class="relative z-10 flex flex-wrap items-center justify-center gap-2">
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
