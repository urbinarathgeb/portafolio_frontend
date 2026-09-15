<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

const { profile } = useProfile()

usePageSeo({
  title: () => profile.value.title,
  description: () => profile.value.heroDescription,
})

// Scroll-spy: marca en la navegación la sección visible
useSectionObserver()
</script>

<template>
  <div>
    <HomeHero />
    <HomeMarquee />
    <HomeProjects />
    <HomeStack />
    <HomeExperience />
    <HomeAbout />
    <HomeContact />
  </div>
</template>
