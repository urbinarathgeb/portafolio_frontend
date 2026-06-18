import type { ApiResponse } from '~/types/project'

export const useAdminStats = () => {
  const { public: config } = useRuntimeConfig()
  const { token } = useAuth()

  const stats = ref([
    { label: 'Proyectos', value: '—', icon: 'i-lucide-folder-kanban' },
    { label: 'Experiencias', value: '—', icon: 'i-lucide-timeline' },
    { label: 'Tecnologías', value: '—', icon: 'i-lucide-cpu' },
    { label: 'Contactos', value: '—', icon: 'i-lucide-mail' },
  ])

  const loading = ref(true)
  const error = ref<string | null>(null)

  const fetchStats = async () => {
    loading.value = true
    error.value = null
    try {
      const headers: Record<string, string> = {}
      if (token.value) {
        headers.Authorization = `Bearer ${token.value}`
      }

      const [projects, experiences, technologies, contacts] = await Promise.all([
        $fetch<ApiResponse<unknown[]>>(`${config.apiBase}/projects`, { headers }),
        $fetch<ApiResponse<unknown[]>>(`${config.apiBase}/experiences`, { headers }),
        $fetch<ApiResponse<unknown[]>>(`${config.apiBase}/technologies`, { headers }),
        $fetch<ApiResponse<unknown[]>>(`${config.apiBase}/contacts`, { headers }),
      ])

      stats.value = [
        { label: 'Proyectos', value: String(projects?.data?.length ?? 0), icon: 'i-lucide-folder-kanban' },
        { label: 'Experiencias', value: String(experiences?.data?.length ?? 0), icon: 'i-lucide-timeline' },
        { label: 'Tecnologías', value: String(technologies?.data?.length ?? 0), icon: 'i-lucide-cpu' },
        { label: 'Contactos', value: String(contacts?.data?.length ?? 0), icon: 'i-lucide-mail' },
      ]
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Error al cargar estadísticas'
    } finally {
      loading.value = false
    }
  }

  return {
    stats,
    loading,
    error,
    fetchStats
  }
}