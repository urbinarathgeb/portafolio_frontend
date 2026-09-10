<script setup lang="ts">
import type { NuxtError } from '#app'

// Página de error global de Nuxt (404, 500...). Vive en app/error.vue,
// no en pages/, para que Nuxt la use ante errores y no sea una ruta más.
const props = defineProps<{ error: NuxtError }>()

const statusCode = computed(() => props.error.statusCode || 500)
const is404 = computed(() => statusCode.value === 404)
const message = computed(() => {
  if (is404.value) return 'La página que buscas no existe o fue movida'
  return props.error.message || 'Ocurrió un error inesperado'
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
  <div class="min-h-screen flex flex-col items-center justify-center bg-default px-4">
    <p class="font-heading text-[clamp(5rem,20vw,10rem)] font-bold leading-none" :class="is404 ? 'text-muted' : 'gradient-text'">
      {{ statusCode }}
    </p>
    <p class="mt-4 text-xl text-muted font-body text-center max-w-md">
      {{ message }}
    </p>
    <p v-if="is404" class="mt-2 text-sm text-muted font-body text-center">
      Revisa la URL o vuelve al inicio
    </p>
    <UButton
      label="Volver al inicio"
      size="lg"
      class="mt-8"
      @click="handleError"
    />
  </div>
</template>
