<script setup lang="ts">
const colorMode = useColorMode()
const isDark = computed(() => colorMode.preference === 'dark')

function toggle() {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}
</script>

<template>
  <button
    :aria-label="isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
    class="fixed top-6 right-[5vw] z-50 flex items-center justify-center w-11 h-11 rounded-full border border-border bg-elevated text-muted cursor-pointer transition-all duration-300 hover:text-highlighted hover:border-accented hover:scale-105 active:scale-95 max-md:right-4 max-md:bottom-4"
    @click="toggle"
  >
    <UIcon :name="isDark ? 'i-lucide-sun' : 'i-lucide-moon'" class="text-lg" />
  </button>
</template>