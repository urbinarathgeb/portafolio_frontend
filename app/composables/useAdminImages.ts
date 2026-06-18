import type { ApiResponse } from '~/types/project'

export interface AdminProjectImage {
  id: number
  projectId: number
  url: string
  publicId: string
  originalName: string
  format: string | null
  bytes: number | null
  isPreview: boolean
  createdAt: string
  project?: { title: string }
}

export const useAdminImages = () => {
  const { public: config } = useRuntimeConfig()
  const token = useCookie<string | null>('auth-token')

  const images = useState<AdminProjectImage[]>('admin-images', () => [])
  const loading = useState('admin-images-loading', () => false)
  const error = useState<string | null>('admin-images-error', () => null)
  const toggling = useState<number | null>('admin-images-toggling', () => null)

  const getHeaders = () => {
    const headers: Record<string, string> = {}
    if (token.value) headers.Authorization = `Bearer ${token.value}`
    return headers
  }

  const fetchAll = async () => {
    loading.value = true
    error.value = null
    try {
      const res = await $fetch<ApiResponse<AdminProjectImage[]>>(`${config.apiBase}/images`, { headers: getHeaders() })
      images.value = res.data
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'Error al cargar imágenes'
    } finally {
      loading.value = false
    }
  }

  const setPreview = async (id: number, isPreview: boolean): Promise<boolean> => {
    toggling.value = id
    try {
      const res = await $fetch<ApiResponse<AdminProjectImage>>(`${config.apiBase}/images/${id}/preview`, {
        method: 'PATCH',
        headers: getHeaders(),
        body: { isPreview },
      })
      const idx = images.value.findIndex(img => img.id === id)
      if (idx !== -1) {
        images.value[idx] = res.data
      }
      return true
    } catch {
      return false
    } finally {
      toggling.value = null
    }
  }

  const groupedByProject = computed(() => {
    const groups: Record<string, { projectId: number; projectTitle: string; images: AdminProjectImage[] }> = {}
    for (const img of images.value) {
      const key = `project-${img.projectId}`
      if (!groups[key]) {
        groups[key] = {
          projectId: img.projectId,
          projectTitle: img.project?.title || `Proyecto #${img.projectId}`,
          images: [],
        }
      }
      groups[key].images.push(img)
    }
    return Object.values(groups).sort((a, b) => a.projectTitle.localeCompare(b.projectTitle))
  })

  const formatBytes = (bytes: number | null): string => {
    if (!bytes) return '—'
    const units = ['B', 'KB', 'MB']
    let value = bytes
    let unit = 0
    while (value >= 1024 && unit < units.length - 1) {
      value /= 1024
      unit++
    }
    return `${value.toFixed(1)} ${units[unit]}`
  }

  return {
    images,
    loading: readonly(loading),
    error: readonly(error),
    toggling: readonly(toggling),
    fetchAll,
    setPreview,
    groupedByProject,
    formatBytes,
  }
}
