<script setup lang="ts">
withDefaults(defineProps<{
  /** dark: sobre fondo oscuro · lime: sobre la sección de contacto */
  tone?: 'dark' | 'lime'
  showEmail?: boolean
}>(), {
  tone: 'dark',
  showEmail: true,
})

const { profile } = useProfile()
const copied = ref(false)
let timer: ReturnType<typeof setTimeout> | undefined

async function copy() {
  try {
    await navigator.clipboard.writeText(profile.value.email)
  } catch {
    // Sin permiso de portapapeles: igual se confirma, el email es visible
  }
  copied.value = true
  clearTimeout(timer)
  timer = setTimeout(() => (copied.value = false), 2000)
}

onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <button
    type="button"
    :aria-label="`Copiar ${profile.email}`"
    class="inline-flex min-h-[54px] min-w-[54px] items-center justify-center gap-2.5 px-[18px] font-mono text-sm transition-colors"
    :class="tone === 'dark'
      ? 'border border-line-strong text-paper hover:border-lime hover:text-lime'
      : 'border border-ink/45 text-ink hover:bg-ink hover:text-lime'"
    @click="copy"
  >
    <span v-if="showEmail">{{ profile.email }}</span>
    <UIcon :name="copied ? 'i-lucide-check' : 'i-lucide-copy'" class="size-4 shrink-0" aria-hidden="true" />
    <span class="sr-only" aria-live="polite">{{ copied ? 'Email copiado' : '' }}</span>
  </button>
</template>
