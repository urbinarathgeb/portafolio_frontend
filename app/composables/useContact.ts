import type { FetchError } from 'ofetch'

export interface ContactForm {
  nombre: string
  email: string
  empresa: string
  interest: string
  mensaje: string
  // Honeypot (input oculto en el formulario)
  website: string
}

const initialState: ContactForm = {
  nombre: '',
  email: '',
  empresa: '',
  interest: '',
  mensaje: '',
  website: '',
}

export const useContact = () => {
  const form = useState<ContactForm>('contact-form', () => ({ ...initialState }))
  const loading = useState('contact-loading', () => false)
  const error = useState<string | null>('contact-error', () => null)
  const success = useState('contact-success', () => false)

  const toPayload = (): ContactInput => ({
    name: form.value.nombre,
    email: form.value.email,
    company: form.value.empresa,
    interest: form.value.interest as ContactInput['interest'],
    message: form.value.mensaje,
    website: form.value.website,
  })

  const submit = async () => {
    // Mismo schema que valida el servidor
    const parsed = contactSchema.safeParse(toPayload())
    if (!parsed.success) {
      error.value = parsed.error.issues[0]?.message ?? 'Revisá los datos del formulario'
      return false
    }

    loading.value = true
    error.value = null
    success.value = false

    try {
      await $fetch('/api/contacts', { method: 'POST', body: parsed.data })
      success.value = true
      reset()
      return true
    } catch (e: unknown) {
      const fetchError = e as FetchError<{ statusMessage?: string }>
      error.value = fetchError.data?.statusMessage ?? fetchError.statusMessage ?? 'Error al enviar el mensaje'
      return false
    } finally {
      loading.value = false
    }
  }

  const reset = () => {
    form.value = { ...initialState }
    error.value = null
    success.value = false
  }

  return {
    form,
    loading: readonly(loading),
    error: readonly(error),
    success: readonly(success),
    submit,
    reset,
  }
}
