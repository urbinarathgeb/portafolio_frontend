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
    class="theme-toggle"
    @click="toggle"
  >
    <UIcon :name="isDark ? 'i-lucide-sun' : 'i-lucide-moon'" class="text-lg" />
  </button>
</template>

<style scoped>
.theme-toggle {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 9999px;
  border: 1px solid var(--ui-border);
  background-color: var(--ui-bg-elevated);
  color: var(--ui-text-muted);
  cursor: pointer;
  transition: all 0.3s ease-out;
}

.theme-toggle:hover {
  color: var(--ui-text-highlighted);
  border-color: var(--ui-border-accented);
  transform: scale(1.05);
}

.theme-toggle:active {
  transform: scale(0.95);
}
</style>
