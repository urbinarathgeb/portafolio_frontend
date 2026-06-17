export interface ContactForm {
  nombre: string
  email: string
  empresa: string
  interest: string
  mensaje: string
}

export interface ContactState {
  form: ContactForm
  loading: boolean
  error: string | null
  success: boolean
}

const initialState: ContactForm = {
  nombre: '',
  email: '',
  empresa: '',
  interest: '',
  mensaje: '',
}

export const useContact = () => {
  const form = useState<ContactForm>('contact-form', () => ({ ...initialState }))
  const loading = useState('contact-loading', () => false)
  const error = useState<string | null>('contact-error', () => null)
  const success = useState('contact-success', () => false)

  const { public: config } = useRuntimeConfig()

  const validate = (): string | null => {
    if (!form.value.nombre.trim()) return 'El nombre es requerido'
    if (!form.value.email.trim()) return 'El email es requerido'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) return 'El email no es válido'
    if (!form.value.mensaje.trim()) return 'El mensaje es requerido'
    return null
  }

  const submit = async () => {
    const validationError = validate()
    if (validationError) {
      error.value = validationError
      return false
    }

    loading.value = true
    error.value = null
    success.value = false

    try {
      await $fetch(`${config.apiBase}/contacts`, {
        method: 'POST',
        body: {
          name: form.value.nombre.trim(),
          email: form.value.email.trim(),
          company: form.value.empresa.trim(),
          interest: form.value.interest,
          message: form.value.mensaje.trim(),
        },
      })
      success.value = true
      reset()
      return true
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Error al enviar el mensaje'
      error.value = message
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