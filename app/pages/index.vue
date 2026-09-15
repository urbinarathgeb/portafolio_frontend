<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

const { profile } = useProfile()

usePageSeo({
  title: () => profile.value.title,
  description: () => profile.value.heroDescription,
})

// Datos estructurados: ayudan a Google a asociar el nombre con el perfil
const siteUrl = useSiteConfig().url
useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: `${profile.value.name} ${profile.value.lastname}`,
      jobTitle: profile.value.title,
      url: siteUrl,
      email: `mailto:${profile.value.email}`,
      address: { '@type': 'PostalAddress', addressLocality: 'Santiago', addressCountry: 'CL' },
      sameAs: ['https://www.linkedin.com/in/urbinarathgeb', 'https://github.com/urbinarathgeb'],
    }),
  }],
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
