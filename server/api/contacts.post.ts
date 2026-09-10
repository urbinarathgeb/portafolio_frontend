// Formulario de contacto: valida, aplica anti-spam y envía el aviso por
// email con Resend. Es la única función serverless del sitio.

const RATE_LIMIT = 5
const RATE_WINDOW_MS = 60 * 60 * 1000

// En memoria: en serverless no se comparte entre instancias, pero para el
// volumen de un portafolio alcanza para frenar abusos simples.
const hits = new Map<string, number[]>()

const isRateLimited = (ip: string) => {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > RATE_LIMIT
}

const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')

const buildHtml = (c: ContactPayload) => {
  const row = (label: string, value: string) => `
        <tr><td style="padding:8px 0;color:#666;font-size:14px">${label}</td></tr>
        <tr><td style="padding:0 0 16px;font-size:16px;white-space:pre-wrap">${value}</td></tr>`
  const interest = c.interest ? CONTACT_INTEREST_LABELS[c.interest] : '—'

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:system-ui,sans-serif;background:#f9f9f9;padding:40px 20px">
  <table style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden">
    <tr><td style="background:linear-gradient(135deg,#E8366D,#FFAF02);padding:24px;text-align:center">
      <h1 style="color:#fff;margin:0;font-size:20px">Nuevo mensaje desde el portafolio</h1>
    </td></tr>
    <tr><td style="padding:32px 24px">
      <table style="width:100%;border-collapse:collapse">${[
        row('Nombre', escapeHtml(c.name)),
        row('Email', escapeHtml(c.email)),
        row('Empresa', escapeHtml(c.company || '—')),
        row('Interés', escapeHtml(interest)),
        row('Mensaje', escapeHtml(c.message)),
      ].join('')}
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

export default defineEventHandler(async (event) => {
  const parsed = contactSchema.safeParse(await readBody(event).catch(() => null))
  if (!parsed.success) {
    throw createError({ statusCode: 400, statusMessage: parsed.error.issues[0]?.message ?? 'Datos inválidos' })
  }
  const contact = parsed.data

  // Honeypot lleno: se responde OK para no darle pistas al bot, sin enviar.
  if (contact.website) return { ok: true }

  const ip = getRequestIP(event, { xForwardedFor: true }) ?? 'unknown'
  if (isRateLimited(ip)) {
    throw createError({ statusCode: 429, statusMessage: 'Demasiados mensajes. Probá de nuevo más tarde.' })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('[contact] Falta RESEND_API_KEY')
    throw createError({ statusCode: 500, statusMessage: 'El servicio de correo no está configurado.' })
  }

  const { contactToEmail } = useRuntimeConfig(event)

  try {
    await $fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}` },
      body: {
        from: 'Portfolio <onboarding@resend.dev>',
        to: [contactToEmail],
        reply_to: contact.email,
        subject: `Nuevo mensaje de ${contact.name}`,
        html: buildHtml(contact),
      },
    })
  } catch (error) {
    console.error('[contact] Error de Resend:', error)
    throw createError({ statusCode: 502, statusMessage: 'No se pudo enviar el mensaje. Probá de nuevo más tarde.' })
  }

  return { ok: true }
})
