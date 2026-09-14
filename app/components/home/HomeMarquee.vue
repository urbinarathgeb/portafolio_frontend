<script setup lang="ts">
const { groups } = useStack()
const items = computed(() => groups.value.filter((g) => !g.learning).flatMap((g) => g.items))
</script>

<template>
  <!-- Decorativa: el contenido real está en la sección Stack -->
  <div class="flex overflow-hidden whitespace-nowrap border-b border-line bg-paper text-ink" aria-hidden="true">
    <div class="flex shrink-0 py-2 font-mono text-xs font-semibold uppercase tracking-[0.1em] animate-tick motion-reduce:animate-none">
      <template v-for="copy in 2" :key="copy">
        <template v-for="item in items" :key="`${copy}-${item}`">
          <span class="px-5">{{ item }}</span>
          <span class="px-5">◆</span>
        </template>
      </template>
    </div>
  </div>
</template>
