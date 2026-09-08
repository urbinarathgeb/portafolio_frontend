export default defineNuxtConfig({
  compatibilityDate: '2026-06-22',
  modules: ['@nuxt/ui', '@nuxt/image', '@nuxtjs/sitemap'],
  nitro: {
    preset: 'vercel',
  },
  // El HTML de las páginas públicas se cachea en el edge de Vercel.
  // Solo el primer visitante tras expirar el TTL despierta a Fly;
  // el resto recibe HTML instantáneo con la máquina dormida.
  routeRules: {
    '/': { isr: 3600 },
    '/about': { isr: 3600 },
    '/experience': { isr: 3600 },
    '/technologies': { isr: 3600 },
    '/projects': { isr: 3600 },
    '/projects/**': { isr: 3600 },
    '/contact': { isr: 3600 },

    // Endpoints públicos de solo lectura: cachea también el proxy,
    // así la navegación cliente (SPA) tampoco toca Fly.
    // Vercel solo cachea GET, por lo que POST /api/contacts pasa directo.
    '/api/profile': { isr: 3600 },
    '/api/projects': { isr: 3600 },
    '/api/projects/**': { isr: 3600 },
    '/api/experiences': { isr: 3600 },
    '/api/technologies': { isr: 3600 },

    // Panel privado: SPA, sin SSR. Nadie más que tú entra acá.
    '/admin/**': { ssr: false },
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