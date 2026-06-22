const API_ORIGIN = 'https://portafolio-backend-divine-ember-2765.fly.dev'

export default defineEventHandler(async (event) => {
  const proxyPath = event.path.replace('/api', '')
  const target = `${API_ORIGIN}${proxyPath}`
  return proxyRequest(event, target)
})
