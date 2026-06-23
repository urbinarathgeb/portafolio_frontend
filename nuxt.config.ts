export default defineNuxtConfig({
  compatibilityDate: '2026-06-22',
  modules: ['@nuxt/ui', '@nuxt/image', '@nuxtjs/sitemap'],
  nitro: {
    preset: 'vercel',
  },
  site: {
    url: 'https://portafolio-frontend-virid.vercel.app',
  },
  image: {
    format: ['webp', 'avif', 'png', 'jpg'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },
  css: ['~/assets/css/main.css'],
  ui: {
    theme: {
      colors: ['primary', 'secondary', 'accent', 'success', 'info', 'warning', 'error'],
    },
  },
  colorMode: {
    preference: 'light',
    fallback: 'light',
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api',
    },
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Javier Urbina — Portfolio',
      meta: [
        { name: 'description', content: 'Portfolio profesional de Javier Urbina. Desarrollador full-stack, proyectos, experiencia y más.' },
        { property: 'og:title', content: 'Javier Urbina — Portfolio' },
        { property: 'og:description', content: 'Portfolio profesional de Javier Urbina. Desarrollador full-stack.' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
    pageTransition: {
      name: 'page',
      mode: 'in-out',
    },
  },
})