import { z } from 'zod'

// Schema del formulario de contacto, compartido entre cliente (validación
// antes de enviar) y servidor (validación real en /api/contacts).

export const CONTACT_INTERESTS = ['fulltime', 'freelance', 'consultoria', 'saludar'] as const

export const CONTACT_INTEREST_LABELS: Record<(typeof CONTACT_INTERESTS)[number], string> = {
  fulltime: 'Posición full-time',
  freelance: 'Proyecto freelance',
  consultoria: 'Consultoría',
  saludar: 'Solo quiere saludar',
}

export const contactSchema = z.object({
  name: z.string().trim().min(1, 'El nombre es requerido').max(100, 'El nombre es demasiado largo'),
  email: z.string().trim().min(1, 'El email es requerido').pipe(z.email('El email no es válido')).pipe(z.string().max(200, 'El email es demasiado largo')),
  company: z.string().trim().max(150, 'La empresa es demasiado larga').default(''),
  interest: z.union([z.enum(CONTACT_INTERESTS), z.literal('')], { error: 'Elegí una opción válida' }).default(''),
  message: z.string().trim().min(1, 'El mensaje es requerido').max(5000, 'El mensaje es demasiado largo'),
  // Honeypot: campo oculto que una persona nunca completa
  website: z.string().default(''),
})

export type ContactInput = z.input<typeof contactSchema>
export type ContactPayload = z.output<typeof contactSchema>
