import type { Project, ApiResponse } from '~/types/project'

export const useProjects = () => {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase

  const { data, pending, error, refresh } = useFetch<ApiResponse<Project[]>>(
    `${apiBase}/projects`,
    {
      key: 'projects',
      lazy: false,
    },
  )

  const projects = computed(() =>
    data.value?.data?.map((p) => ({
      ...p,
      techStack: p.techStackDetails?.map((t) => t.name) ?? [],
    })) ?? [],
  )

  return {
    projects,
    pending,
    error,
    refresh,
  }
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
    return {
      ...p,
      techStack: p.techStackDetails?.map((t) => t.name) ?? [],
    }
  })

  return {
    project,
    pending,
    error,
  }
}
