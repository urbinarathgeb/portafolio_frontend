<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

interface Props {
  error: {
    statusCode: number
    message: string
  }
}

const props = defineProps<Props>()

const statusCode = computed(() => props.error.statusCode || 500)
const is404 = computed(() => statusCode.value === 404)
const message = computed(() => {
  if (is404.value) return 'La página que buscas no existe o fue movida'
  return props.error.message || 'Ocurrió un error inesperado'
})

useSeoMeta({
  title: computed(() => `Error ${statusCode.value} — Kako`),
  ogTitle: computed(() => `Error ${statusCode.value} — Kako`),
  description: is404.value ? 'Página no encontrada.' : 'Error inesperado.',
  ogDescription: is404.value ? 'Página no encontrada.' : 'Error inesperado.',
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
