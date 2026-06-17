export interface AdminService {
  id: number
  title: string
  description: string
  icon: string | null
  createdAt: string
  updatedAt: string
}

export interface ServiceForm {
  title: string
  description: string
  icon: string
}

const initialForm: ServiceForm = {
  title: '',
  description: '',
  icon: '',
}

export const useAdminServices = () => {
  const { public: config } = useRuntimeConfig()
  const token = useCookie<string | null>('auth-token')

  const services = useState<AdminService[]>('admin-services', () => [])
  const loading = useState('admin-services-loading', () => false)
  const submitting = useState('admin-services-submitting', () => false)
  const error = useState<string | null>('admin-services-error', () => null)

  const getHeaders = () => {
    const headers: Record<string, string> = {}
    if (token.value) headers.Authorization = `Bearer ${token.value}`
    return headers
  }

  const fetchAll = async () => {
    loading.value = true
    error.value = null
    try {
      const res = await $fetch<ApiResponse<AdminService[]>>(`${config.apiBase}/services`, { headers: getHeaders() })
      services.value = res.data
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'Error al cargar servicios'
    } finally {
      loading.value = false
    }
  }

  const fetchById = async (id: number): Promise<AdminService | null> => {
    try {
      const res = await $fetch<ApiResponse<AdminService>>(`${config.apiBase}/services/${id}`, { headers: getHeaders() })
      return res.data
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'Error al cargar servicio'
      return null
    }
  }

  const create = async (form: ServiceForm): Promise<AdminService | null> => {
    submitting.value = true
    error.value = null
    try {
      const res = await $fetch<ApiResponse<AdminService>>(`${config.apiBase}/services`, {
        method: 'POST',
        headers: getHeaders(),
        body: { ...form, icon: form.icon || undefined },
      })
      services.value.unshift(res.data)
      return res.data
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'Error al crear servicio'
      return null
    } finally {
      submitting.value = false
    }
  }

  const update = async (id: number, form: ServiceForm): Promise<AdminService | null> => {
    submitting.value = true
    error.value = null
    try {
      const res = await $fetch<ApiResponse<AdminService>>(`${config.apiBase}/services/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: { ...form, icon: form.icon || undefined },
      })
      const idx = services.value.findIndex(s => s.id === id)
      if (idx !== -1) services.value[idx] = res.data
      return res.data
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'Error al actualizar servicio'
      return null
    } finally {
      submitting.value = false
    }
  }

  const remove = async (id: number): Promise<boolean> => {
    try {
      await $fetch(`${config.apiBase}/services/${id}`, { method: 'DELETE', headers: getHeaders() })
      services.value = services.value.filter(s => s.id !== id)
      return true
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'Error al eliminar servicio'
      return false
    }
  }

  const getEmptyForm = (): ServiceForm => ({ ...initialForm })
  const serviceToForm = (s: AdminService): ServiceForm => ({
    title: s.title,
    description: s.description,
    icon: s.icon || '',
  })

  return {
    services,
    loading: readonly(loading),
    submitting: readonly(submitting),
    error: readonly(error),
    fetchAll,
    fetchById,
    create,
    update,
    remove,
    getEmptyForm,
    serviceToForm,
  }
}
