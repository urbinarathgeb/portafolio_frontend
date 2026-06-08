<script setup lang="ts">
interface NavItem {
  id: number
  number: string
}

defineProps<{
  items: NavItem[]
  activeId: number | null
}>()

const emit = defineEmits<{
  select: [id: number]
}>()
</script>

<template>
  <nav class="nav">
    <button
      v-for="item in items"
      :key="item.id"
      :class="[
        'flex items-center gap-2 font-body text-sm tracking-[0.1em] text-left cursor-pointer transition-all duration-300 ease-out border-none bg-transparent p-0',
        activeId === item.id
          ? 'opacity-100 font-bold text-primary'
          : 'opacity-50 font-medium text-muted hover:opacity-75'
      ]"
      @click="emit('select', item.id)"
    >
      <span
        :class="[
          'block h-px shrink-0 transition-all duration-300 ease-out origin-left',
          activeId === item.id
            ? 'w-8 bg-primary'
            : 'w-0 bg-muted hover-item'
        ]"
      />
      {{ item.number }}
    </button>
  </nav>
</template>

<style scoped>
.nav {
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  position: absolute;
  top: 50%;
  left: 2rem;
  transform: translateY(-50%);
  z-index: 30;
}

button:hover .hover-item {
  width: 1rem;
}

button:hover {
  transform: translateX(4px);
}

button:active {
  transform: translateX(0);
}
</style>
