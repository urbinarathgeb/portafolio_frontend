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
    class="relative inline-flex min-h-[54px] min-w-[54px] items-center justify-center gap-2.5 px-[18px] font-mono text-sm transition-colors"
    :class="tone === 'dark'
      ? 'border border-line-strong text-paper hover:border-lime hover:text-lime'
      : 'border border-ink/45 text-ink hover:bg-ink hover:text-lime'"
    @click="copy"
  >
    <!-- El texto cambia a "¡Copiado!" sin mover el layout: ambos ocupan la misma celda -->
    <span v-if="showEmail" class="grid [&>*]:col-start-1 [&>*]:row-start-1">
      <span :class="copied && 'invisible'">{{ profile.email }}</span>
      <span :class="!copied && 'invisible'" aria-hidden="true">¡Copiado!</span>
    </span>
    <UIcon :name="copied ? 'i-lucide-check' : 'i-lucide-copy'" class="size-4 shrink-0" aria-hidden="true" />
    <!-- Solo ícono: etiqueta flotante sobre el botón -->
    <Transition
      enter-from-class="opacity-0 translate-y-1"
      leave-to-class="opacity-0"
      enter-active-class="transition duration-150"
      leave-active-class="transition duration-150"
    >
      <span
        v-if="copied && !showEmail"
        class="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap bg-lime px-2.5 py-1 font-mono text-xs font-semibold text-ink"
        aria-hidden="true"
      >
        ¡Copiado!
      </span>
    </Transition>
    <span class="sr-only" aria-live="polite">{{ copied ? 'Email copiado' : '' }}</span>
  </button>
</template>
