import type { Technology } from '~/types/technology'
import type { ApiResponse } from '~/types/project'

export interface AdminExperience {
  id: number
  year: number
  role: string
  company: string
  location: string
  description: string
  order: number
  technologies: Technology[]
  createdAt: string
  updatedAt: string
}

export interface ExperienceForm {
  year: number | null
  role: string
  company: string
  location: string
  description: string
  order: number
  techIds: number[]
}

const initialForm: ExperienceForm = {
  year: null,
  role: '',
  company: '',
  location: '',
  description: '',
  order: 0,
  techIds: [],
}

export const useAdminExperiences = () => {
  const { public: config } = useRuntimeConfig()
  const token = useCookie<string | null>('auth-token')

  const experiences = useState<AdminExperience[]>('admin-experiences', () => [])
  const technologies = useState<Technology[]>('admin-exp-tech-list', () => [])
  const loading = useState('admin-experiences-loading', () => false)
  const submitting = useState('admin-experiences-submitting', () => false)
  const error = useState<string | null>('admin-experiences-error', () => null)

  const getHeaders = () => {
    const headers: Record<string, string> = {}
    if (token.value) headers.Authorization = `Bearer ${token.value}`
    return headers
  }

  const fetchAll = async () => {
    loading.value = true
    error.value = null
    try {
      const res = await $fetch<ApiResponse<AdminExperience[]>>(`${config.apiBase}/experiences`, { headers: getHeaders() })
      experiences.value = res.data
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'Error al cargar experiencias'
    } finally {
      loading.value = false
    }
  }

  const fetchById = async (id: number): Promise<AdminExperience | null> => {
    try {
      const res = await $fetch<ApiResponse<AdminExperience>>(`${config.apiBase}/experiences/${id}`, { headers: getHeaders() })
      return res.data
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'Error al cargar experiencia'
      return null
    }
  }

  const fetchTechnologies = async () => {
    try {
      const res = await $fetch<ApiResponse<Technology[]>>(`${config.apiBase}/technologies`, { headers: getHeaders() })
      technologies.value = res.data
    } catch { /* silent */ }
  }

  const create = async (form: ExperienceForm): Promise<AdminExperience | null> => {
    submitting.value = true
    error.value = null
    try {
      const res = await $fetch<ApiResponse<AdminExperience>>(`${config.apiBase}/experiences`, {
        method: 'POST',
        headers: getHeaders(),
        body: {
          year: form.year,
          role: form.role,
          company: form.company,
          location: form.location,
          description: form.description,
          order: form.order,
          techIds: form.techIds,
        },
      })
      experiences.value.unshift(res.data)
      return res.data
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'Error al crear experiencia'
      return null
    } finally {
      submitting.value = false
    }
  }

  const update = async (id: number, form: ExperienceForm): Promise<AdminExperience | null> => {
    submitting.value = true
    error.value = null
    try {
      const res = await $fetch<ApiResponse<AdminExperience>>(`${config.apiBase}/experiences/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: {
          year: form.year,
          role: form.role,
          company: form.company,
          location: form.location,
          description: form.description,
          order: form.order,
          techIds: form.techIds,
        },
      })
      const idx = experiences.value.findIndex(e => e.id === id)
      if (idx !== -1) experiences.value[idx] = res.data
      return res.data
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'Error al actualizar experiencia'
      return null
    } finally {
      submitting.value = false
    }
  }

  const remove = async (id: number): Promise<boolean> => {
    try {
      await $fetch(`${config.apiBase}/experiences/${id}`, { method: 'DELETE', headers: getHeaders() })
      experiences.value = experiences.value.filter(e => e.id !== id)
      return true
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'Error al eliminar experiencia'
      return false
    }
  }

  const getEmptyForm = (): ExperienceForm => ({ ...initialForm })

  const experienceToForm = (exp: AdminExperience): ExperienceForm => ({
    year: exp.year,
    role: exp.role,
    company: exp.company,
    location: exp.location,
    description: exp.description,
    order: exp.order,
    techIds: exp.technologies?.map(t => t.id) || [],
  })

  return {
    experiences,
    technologies,
    loading: readonly(loading),
    submitting: readonly(submitting),
    error: readonly(error),
    fetchAll,
    fetchById,
    fetchTechnologies,
    create,
    update,
    remove,
    getEmptyForm,
    experienceToForm,
  }
}
