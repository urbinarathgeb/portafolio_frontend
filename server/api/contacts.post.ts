// Temporal: reenvía el formulario de contacto al backend en Fly.
// Se reemplaza en A4 por el envío directo con Resend.
const API_ORIGIN = 'https://portafolio-backend-divine-ember-2765.fly.dev'

export default defineEventHandler((event) => proxyRequest(event, `${API_ORIGIN}/contacts`))
