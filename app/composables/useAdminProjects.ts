import type { Technology } from '~/types/technology'
import type { Project } from '~/types/project'

export interface ProjectForm {
  title: string
  subtitle: string
  description: string
  githubURL: string
  deployURL: string
  isFeatured: boolean
  techIds: number[]
}

const initialForm: ProjectForm = {
  title: '',
  subtitle: '',
  description: '',
  githubURL: '',
  deployURL: '',
  isFeatured: false,
  techIds: [],
}

export const useAdminProjects = () => {
  const { public: config } = useRuntimeConfig()
  const token = useCookie<string | null>('auth-token')

  const projects = useState<Project[]>('admin-projects', () => [])
  const technologies = useState<Technology[]>('admin-tech-list', () => [])
  const loading = useState('admin-projects-loading', () => false)
  const submitting = useState('admin-projects-submitting', () => false)
  const error = useState<string | null>('admin-projects-error', () => null)

  const getHeaders = () => {
    const headers: Record<string, string> = {}
    if (token.value) {
      headers.Authorization = `Bearer ${token.value}`
    }
    return headers
  }

  const fetchAll = async () => {
    loading.value = true
    error.value = null
    try {
      const res = await $fetch<ApiResponse<Project[]>>(`${config.apiBase}/projects`, {
        headers: getHeaders(),
      })
      projects.value = res.data
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'Error al cargar proyectos'
    } finally {
      loading.value = false
    }
  }

  const fetchById = async (id: number): Promise<Project | null> => {
    try {
      const res = await $fetch<ApiResponse<Project>>(`${config.apiBase}/projects/${id}`, {
        headers: getHeaders(),
      })
      return res.data
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'Error al cargar proyecto'
      return null
    }
  }

  const fetchTechnologies = async () => {
    try {
      const res = await $fetch<ApiResponse<Technology[]>>(`${config.apiBase}/technologies`, {
        headers: getHeaders(),
      })
      technologies.value = res.data
    } catch {
      // Silently fail — technologies list is not critical
    }
  }

  const create = async (form: ProjectForm): Promise<Project | null> => {
    submitting.value = true
    error.value = null
    try {
      const res = await $fetch<ApiResponse<Project>>(`${config.apiBase}/projects`, {
        method: 'POST',
        headers: getHeaders(),
        body: {
          title: form.title,
          subtitle: form.subtitle,
          description: form.description,
          githubURL: form.githubURL || undefined,
          deployURL: form.deployURL || undefined,
          isFeatured: form.isFeatured,
          userId: JSON.parse(atob(token.value!.split('.')[1])).id,
          techIds: form.techIds,
        },
      })
      projects.value.unshift(res.data)
      return res.data
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'Error al crear proyecto'
      return null
    } finally {
      submitting.value = false
    }
  }

  const update = async (id: number, form: ProjectForm): Promise<Project | null> => {
    submitting.value = true
    error.value = null
    try {
      const res = await $fetch<ApiResponse<Project>>(`${config.apiBase}/projects/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: {
          title: form.title,
          subtitle: form.subtitle,
          description: form.description,
          githubURL: form.githubURL || undefined,
          deployURL: form.deployURL || undefined,
          isFeatured: form.isFeatured,
          techIds: form.techIds,
        },
      })
      const idx = projects.value.findIndex(p => p.id === id)
      if (idx !== -1) projects.value[idx] = res.data
      return res.data
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'Error al actualizar proyecto'
      return null
    } finally {
      submitting.value = false
    }
  }

  const remove = async (id: number): Promise<boolean> => {
    try {
      await $fetch(`${config.apiBase}/projects/${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
      })
      projects.value = projects.value.filter(p => p.id !== id)
      return true
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'Error al eliminar proyecto'
      return false
    }
  }

  const uploadImage = async (projectId: number, file: File): Promise<boolean> => {
    try {
      const formData = new FormData()
      formData.append('image', file)
      await $fetch(`${config.apiBase}/projects/${projectId}/images`, {
        method: 'POST',
        headers: {
          ...getHeaders(),
        },
        body: formData,
      })
      return true
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'Error al subir imagen'
      return false
    }
  }

  const getEmptyForm = (): ProjectForm => ({ ...initialForm })

  const projectToForm = (project: Project): ProjectForm => ({
    title: project.title,
    subtitle: project.subtitle,
    description: project.description,
    githubURL: project.githubURL || '',
    deployURL: project.deployURL || '',
    isFeatured: project.isFeatured,
    techIds: project.techStackDetails?.map(t => t.id) || [],
  })

  return {
    projects,
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
    uploadImage,
    getEmptyForm,
    projectToForm,
  }
}
