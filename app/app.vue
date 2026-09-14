<script setup lang="ts">
</script>

<template>
  <UApp>
    <NuxtLoadingIndicator
      :throttle="0"
      :duration="2000"
      color="var(--color-lime)"
    />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
