<script setup lang="ts">
import type { NuxtError } from '#app'

// Página de error global de Nuxt (404, 500...). Vive en app/error.vue,
// no en pages/, para que Nuxt la use ante errores y no sea una ruta más.
const props = defineProps<{ error: NuxtError }>()

const statusCode = computed(() => props.error.statusCode || 500)
const is404 = computed(() => statusCode.value === 404)
const message = computed(() => {
  if (is404.value) return 'La página que buscas no existe o fue movida.'
  return props.error.message || 'Ocurrió un error inesperado.'
})

usePageSeo({
  title: () => `Error ${statusCode.value}`,
  description: () => (is404.value ? 'Página no encontrada.' : 'Error inesperado.'),
})

function handleError() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <main class="flex min-h-dvh flex-col justify-center bg-ink bg-blueprint px-[clamp(16px,4vw,44px)] py-16 text-paper">
    <div class="eyebrow mb-6 flex items-center gap-3 text-dim">
      <span>Error</span>
      <span class="h-px flex-1 bg-line" aria-hidden="true" />
      <span>{{ is404 ? 'No encontrado' : 'Inesperado' }}</span>
    </div>
    <p class="font-mono text-[clamp(72px,18vw,200px)] font-semibold leading-none text-lime">
      {{ statusCode }}
    </p>
    <h1 class="mt-6 max-w-[30ch] font-display text-[clamp(24px,3.6vw,40px)] font-bold leading-tight tracking-[-0.03em]">
      {{ message }}
    </h1>
    <div class="mt-8">
      <button
        type="button"
        class="inline-flex min-h-[54px] items-center bg-paper px-[26px] font-mono text-sm font-semibold uppercase tracking-[0.04em] text-ink transition-colors hover:bg-lime"
        @click="handleError"
      >
        Volver al inicio
      </button>
    </div>
  </main>
</template>
