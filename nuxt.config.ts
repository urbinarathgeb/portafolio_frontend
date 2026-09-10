import { projects } from './app/data/projects'
import { validateContent } from './app/data/validate'

export default defineNuxtConfig({
  hooks: {
    // Un dato inválido en app/data rompe el build (y el CI)
    'build:before': () => validateContent(),
  },
  compatibilityDate: '2026-06-22',
  modules: ['@nuxt/eslint', '@nuxt/ui', '@nuxt/image', '@nuxtjs/sitemap'],
  nitro: {
    preset: 'vercel',
    prerender: {
      crawlLinks: true,
      routes: ['/', ...projects.map((p) => `/projects/${p.id}`)],
    },
  },
  // SSG: las páginas públicas se generan como HTML estático en el build.
  // El contenido vive en app/data, así que el build no depende de ninguna API.
  routeRules: {
    '/': { prerender: true },
    '/about': { prerender: true },
    '/experience': { prerender: true },
    '/technologies': { prerender: true },
    '/projects': { prerender: true },
    '/projects/**': { prerender: true },
    '/contact': { prerender: true },
  },
  site: {
    url: 'https://urbinarathgeb.vercel.app',
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
    // Solo servidor. Sobrescribible con NUXT_CONTACT_TO_EMAIL.
    // La API key de Resend se lee de RESEND_API_KEY en tiempo de ejecución.
    contactToEmail: 'urbinarathgeb@gmail.com',
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