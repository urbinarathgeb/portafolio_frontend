import type { Experience } from '~/types/experience'

export const useExperience = () => {
  const config = useRuntimeConfig()
  const cache = useState('experiences-cache', () => [] as Experience[])

  if (cache.value.length > 0) {
    return {
      experiences: computed(() => cache.value.map((exp) => ({
        ...exp,
        technologies: Array.isArray(exp.technologies)
          ? (exp.technologies as { name: string }[]).map((t) => t.name)
          : [],
      }))),
      pending: ref(false),
      error: ref(null),
    }
  }

  const { data, pending, error } = useFetch<{ status: string; data: Experience[] }>(
    `${config.public.apiBase}/experiences`,
    { key: 'experiences' },
  )

  watch(data, (val) => {
    if (val?.data) {
      cache.value = val.data
    }
  }, { immediate: true })

  const experiences = computed<Experience[]>(() => {
    const items = cache.value.length > 0 ? cache.value : data.value?.data ?? []
    return items.map((exp) => ({
      ...exp,
      technologies: Array.isArray(exp.technologies)
        ? (exp.technologies as { name: string }[]).map((t) => t.name)
        : [],
    }))
  })

  return { experiences, pending, error }
}
