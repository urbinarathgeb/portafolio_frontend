import type { ApiResponse } from '~/types/project'

export interface AdminTechnology {
  id: number
  name: string
  category: string
  description: string | null
  icon: string | null
  span: number | null
  order: number | null
  showInStack: boolean
  createdAt: string
  updatedAt: string
}

export interface TechnologyForm {
  name: string
  category: string
  description: string
  icon: string
  span: number | null
  order: number | null
  showInStack: boolean
}

const initialForm: TechnologyForm = {
  name: '',
  category: '',
  description: '',
  icon: '',
  span: null,
  order: null,
  showInStack: false,
}

export const useAdminTechnologies = () => {
  const { public: config } = useRuntimeConfig()
  const token = useCookie<string | null>('auth-token')
  const toast = useToast()

  const technologies = useState<AdminTechnology[]>('admin-techs', () => [])
  const loading = useState('admin-techs-loading', () => false)
  const submitting = useState('admin-techs-submitting', () => false)
  const error = useState<string | null>('admin-techs-error', () => null)

  const categories = computed(() =>
    [...new Set(technologies.value.map(t => t.category))].sort()
  )

  const getHeaders = () => {
    const headers: Record<string, string> = {}
    if (token.value) headers.Authorization = `Bearer ${token.value}`
    return headers
  }

  const fetchAll = async () => {
    loading.value = true
    error.value = null
    try {
      const res = await $fetch<ApiResponse<AdminTechnology[]>>(`${config.apiBase}/technologies`, { headers: getHeaders() })
      technologies.value = res.data
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'Error al cargar tecnologías'
    } finally {
      loading.value = false
    }
  }

  const fetchById = async (id: number): Promise<AdminTechnology | null> => {
    try {
      const res = await $fetch<ApiResponse<AdminTechnology>>(`${config.apiBase}/technologies/${id}`, { headers: getHeaders() })
      return res.data
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'Error al cargar tecnología'
      return null
    }
  }

  const create = async (form: TechnologyForm): Promise<AdminTechnology | null> => {
    submitting.value = true
    error.value = null
    try {
      const res = await $fetch<ApiResponse<AdminTechnology>>(`${config.apiBase}/technologies`, {
        method: 'POST',
        headers: getHeaders(),
        body: {
          name: form.name,
          category: form.category,
          description: form.description || undefined,
          icon: form.icon || undefined,
          span: form.span || undefined,
          order: form.order ?? undefined,
          showInStack: form.showInStack,
        },
      })
      technologies.value.unshift(res.data)
      toast.add({ title: 'Éxito', description: 'Tecnología creada correctamente', color: 'success' })
      return res.data
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Error al crear tecnología'
      error.value = msg
      toast.add({ title: 'Error', description: msg, color: 'error' })
      return null
    } finally {
      submitting.value = false
    }
  }

  const update = async (id: number, form: TechnologyForm): Promise<AdminTechnology | null> => {
    submitting.value = true
    error.value = null
    try {
      const res = await $fetch<ApiResponse<AdminTechnology>>(`${config.apiBase}/technologies/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: {
          name: form.name,
          category: form.category,
          description: form.description || undefined,
          icon: form.icon || undefined,
          span: form.span || undefined,
          order: form.order ?? undefined,
          showInStack: form.showInStack,
        },
      })
      const idx = technologies.value.findIndex(t => t.id === id)
      if (idx !== -1) technologies.value[idx] = res.data
      toast.add({ title: 'Éxito', description: 'Tecnología actualizada correctamente', color: 'success' })
      return res.data
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Error al actualizar tecnología'
      error.value = msg
      toast.add({ title: 'Error', description: msg, color: 'error' })
      return null
    } finally {
      submitting.value = false
    }
  }

  const remove = async (id: number): Promise<boolean> => {
    try {
      await $fetch(`${config.apiBase}/technologies/${id}`, { method: 'DELETE', headers: getHeaders() })
      technologies.value = technologies.value.filter(t => t.id !== id)
      toast.add({ title: 'Éxito', description: 'Tecnología eliminada correctamente', color: 'success' })
      return true
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Error al eliminar tecnología'
      error.value = msg
      toast.add({ title: 'Error', description: msg, color: 'error' })
      return false
    }
  }

  const getEmptyForm = (): TechnologyForm => ({ ...initialForm })

  const technologyToForm = (tech: AdminTechnology): TechnologyForm => ({
    name: tech.name,
    category: tech.category,
    description: tech.description || '',
    icon: tech.icon || '',
    span: tech.span,
    order: tech.order,
    showInStack: tech.showInStack,
  })

  return {
    technologies,
    categories,
    loading: readonly(loading),
    submitting: readonly(submitting),
    error: readonly(error),
    fetchAll,
    fetchById,
    create,
    update,
    remove,
    getEmptyForm,
    technologyToForm,
  }
}