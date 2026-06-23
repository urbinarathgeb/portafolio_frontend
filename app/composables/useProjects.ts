import type { Project, ApiResponse } from '~/types/project'

export const useProjects = () => {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase
  const cache = useState<Project[]>('projects-cache', () => [])

  if (cache.value.length > 0) {
    return {
      projects: computed(() => cache.value.map((p) => ({
        ...p,
        techStack: p.techStackDetails?.map((t) => t.name) ?? [],
      }))),
      pending: ref(false),
      error: ref(null),
      refresh: () => {},
    }
  }

  const { data, pending, error, refresh } = useFetch<ApiResponse<Project[]>>(
    `${apiBase}/projects`,
    { key: 'projects' },
  )

  watch(data, (val) => {
    if (val?.data) {
      cache.value = val.data
    }
  }, { immediate: true })

  const projects = computed(() => {
    const items = cache.value.length > 0 ? cache.value : data.value?.data ?? []
    return items.map((p) => ({
      ...p,
      techStack: p.techStackDetails?.map((t) => t.name) ?? [],
    }))
  })

  return { projects, pending, error, refresh }
}

export const useProject = (id: number | string) => {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase

  const { data, pending, error } = useFetch<ApiResponse<Project>>(
    `${apiBase}/projects/${id}`,
    {
      key: `project-${id}`,
      lazy: false,
    },
  )

  const project = computed(() => {
    if (!data.value?.data) return null
    const p = data.value.data
    let caseStudy = null
    if (p.caseStudy) {
      caseStudy = typeof p.caseStudy === 'string' ? JSON.parse(p.caseStudy) : p.caseStudy
    }
    return {
      ...p,
      techStack: p.techStackDetails?.map((t) => t.name) ?? [],
      caseStudy,
    }
  })

  return {
    project,
    pending,
    error,
  }
}
