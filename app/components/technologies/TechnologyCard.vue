<script setup lang="ts">
import type { Technology } from '~/types/technology'

interface Props {
  technology: Technology
  index: number
}

const props = defineProps<Props>()

const isWide = computed(() => props.technology.span >= 5)

const SPAN_CLASSES = [
  'col-span-1', 'col-span-2', 'col-span-3', 'col-span-4',
  'col-span-5', 'col-span-6', 'col-span-7', 'col-span-8',
  'col-span-9', 'col-span-10', 'col-span-11', 'col-span-12',
]

const colSpanClass = computed(() => {
  const span = Math.max(1, Math.min(12, props.technology.span || 4))
  return SPAN_CLASSES[span - 1]
})
</script>

<template>
  <div
    :class="[colSpanClass, 'max-lg:col-span-6 max-md:!col-span-1']"
  >
    <div
      class="group relative h-[340px] bg-elevated border border-border overflow-hidden flex flex-col justify-between p-8 transition-all duration-500 ease-out hover:-translate-y-2 hover:border-primary hover:shadow-[0_0_40px_rgba(232,54,109,0.15)] cursor-pointer opacity-0 animate-fade-up max-lg:p-6 max-md:h-[280px]"
      :style="{ animationDelay: `${index * 0.1}s` }"
    >
      <!-- Icono top-right con glow -->
      <div class="absolute top-6 right-6 max-lg:top-4 max-lg:right-4">
        <div class="absolute inset-0 -inset-4 bg-primary rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
        <UIcon
          :name="technology.icon"
          class="relative text-primary opacity-20 group-hover:opacity-100 transition-opacity duration-500"
          :class="[isWide ? 'text-5xl' : 'text-3xl']"
        />
      </div>

      <!-- Contenido anclado abajo -->
      <div class="mt-auto">
        <span class="block font-mono text-xs font-medium tracking-[0.15em] uppercase text-muted mb-3">
          {{ technology.category }}
        </span>
        <h3
          class="font-heading font-bold leading-[0.85] tracking-tight text-primary mb-4 text-[clamp(2rem,4vw,3.5rem)]"
          :class="[isWide ? 'md:text-[clamp(3.5rem,6vw,5.5rem)]' : 'md:text-[clamp(2rem,4vw,3.5rem)]']"
        >
          {{ technology.name }}
        </h3>
        <p
          class="font-body text-sm leading-relaxed text-toned"
          :class="[isWide ? 'max-w-[500px]' : 'max-w-[280px]']"
        >
          {{ technology.description }}
        </p>
      </div>

      <!-- Barra de acento inferior -->
      <div class="absolute bottom-0 left-0 h-1 bg-primary w-0 group-hover:w-full transition-all duration-700 ease-out" />
    </div>
  </div>
</template>
