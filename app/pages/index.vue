<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

const { profile } = useProfile()

usePageSeo({
  title: () => profile.value.title,
  description: () => profile.value.heroDescription,
  image: '/images/og-image.svg',
})

// Scroll-spy: marca en la navegación la sección visible
useSectionObserver()
</script>

<template>
  <div>
    <HomeHero />
    <HomeProjects />
    <HomeStack />
    <HomeExperience />
    <HomeAbout />
    <HomeContact />
  </div>
</template>
