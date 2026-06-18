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
  <nav class="max-md:hidden flex flex-col justify-center gap-4 absolute top-1/2 left-8 -translate-y-1/2 z-30">
    <button
      v-for="item in items"
      :key="item.id"
      :class="[
        'flex items-center gap-2 font-body text-sm tracking-[0.1em] text-left cursor-pointer transition-all duration-300 ease-out border-none bg-transparent p-0 hover:translate-x-1 active:translate-x-0',
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
            : 'w-0 bg-muted group-hover/btn:w-4'
        ]"
      />
      {{ item.number }}
    </button>
  </nav>
</template>


