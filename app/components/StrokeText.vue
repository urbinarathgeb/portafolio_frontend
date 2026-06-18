<script setup lang="ts">
interface Props {
  text: string
  textSize?: string
}

withDefaults(defineProps<Props>(), {
  textSize: 'clamp(4rem,12vw,8rem)',
})
</script>

<template>
  <div class="fixed top-[3vh] right-[5vw] pointer-events-none select-none z-0 max-md:hidden">
    <div
      class="font-stroke tracking-[-0.08em] leading-[0.85] stroke-text opacity-[0.15] whitespace-nowrap"
      :style="{ fontSize: textSize }"
    >
      {{ text }}
    </div>
    <div
      class="font-stroke tracking-[-0.08em] leading-[0.85] stroke-text opacity-[0.08] whitespace-nowrap -mt-[0.3em]"
      :style="{ fontSize: textSize }"
    >
      {{ text }}
    </div>
    <div
      class="font-stroke tracking-[-0.08em] leading-[0.85] stroke-text opacity-[0.03] whitespace-nowrap -mt-[0.3em]"
      :style="{ fontSize: textSize }"
    >
      {{ text }}
    </div>
  </div>
</template>
