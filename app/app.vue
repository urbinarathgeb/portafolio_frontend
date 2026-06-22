<script setup lang="ts">
</script>

<template>
  <UApp>
    <NuxtLoadingIndicator
      :throttle="0"
      :duration="2000"
      color="repeating-linear-gradient(90deg, var(--ui-color-primary-400), var(--ui-color-accent-400), var(--ui-color-primary-400))"
    />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
