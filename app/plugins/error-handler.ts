export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.errorHandler = (error, _instance, info) => {
    console.error(`[Vue Error] (${info}):`, error)
  }

  if (import.meta.client) {
    window.onerror = (_msg, _url, _line, _col, error) => {
      console.error('[Uncaught Error]:', error)
    }

    window.onunhandledrejection = (event) => {
      console.error('[Unhandled Promise]:', event.reason)
    }
  }
})
