<script setup lang="ts">
const { groups } = useStack()
</script>

<template>
  <section id="stack" class="border-b border-line">
    <SectionHeader title="Stack" meta="Uso diario" />
    <div class="px-[clamp(16px,4vw,44px)] pb-[clamp(28px,4.5vw,56px)]">
      <div class="grid gap-px border border-line bg-line [grid-template-columns:repeat(auto-fit,minmax(min(100%,180px),1fr))]">
        <div
          v-for="(group, i) in groups"
          :key="group.id"
          class="grid content-start gap-3.5 p-[clamp(16px,2.4vw,24px)]"
          :class="group.learning ? 'bg-ink-2' : 'bg-ink'"
        >
          <h3 class="eyebrow" :class="group.learning ? 'text-dim' : 'text-lime'">
            {{ String(i + 1).padStart(2, '0') }} / {{ group.label }}
          </h3>
          <ul
            class="grid gap-1 text-[clamp(17px,2vw,22px)] tracking-[-0.02em]"
            :class="group.learning ? 'font-normal text-mute' : 'font-medium'"
          >
            <li v-for="item in group.items" :key="item">{{ item }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
