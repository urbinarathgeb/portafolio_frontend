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
const message = computed(() => props.error.message || 'Ocurrió un error inesperado')

useSeoMeta({
  title: computed(() => `Error ${statusCode.value} — Kako`),
  ogTitle: computed(() => `Error ${statusCode.value} — Kako`),
  description: 'Página no encontrada o error inesperado.',
  ogDescription: 'Página no encontrada o error inesperado.',
})

function handleError() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-default px-4">
    <h1 class="font-heading text-[10rem] font-bold gradient-text leading-none">
      {{ statusCode }}
    </h1>
    <p class="mt-4 text-xl text-muted font-body text-center max-w-md">
      {{ message }}
    </p>
    <UButton
      label="Volver al inicio"
      size="lg"
      class="mt-8"
      @click="handleError"
    />
  </div>
</template>
