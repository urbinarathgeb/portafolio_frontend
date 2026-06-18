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
        $fetch(`${config.apiBase}/projects`, { headers }),
        $fetch(`${config.apiBase}/experiences`, { headers }),
        $fetch(`${config.apiBase}/technologies`, { headers }),
        $fetch(`${config.apiBase}/contacts`, { headers }),
      ])

      stats.value = [
        { label: 'Proyectos', value: String((projects as any)?.data?.length ?? 0), icon: 'i-lucide-folder-kanban' },
        { label: 'Experiencias', value: String((experiences as any)?.data?.length ?? 0), icon: 'i-lucide-timeline' },
        { label: 'Tecnologías', value: String((technologies as any)?.data?.length ?? 0), icon: 'i-lucide-cpu' },
        { label: 'Contactos', value: String((contacts as any)?.data?.length ?? 0), icon: 'i-lucide-mail' },
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