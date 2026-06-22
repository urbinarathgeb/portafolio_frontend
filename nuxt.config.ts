export default defineNuxtConfig({
  compatibilityDate: '2026-06-22',
  modules: ['@nuxt/ui', '@nuxt/image'],
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
    pageTransition: {
      name: 'page',
      mode: 'out-in',
    },
  },
})