import type { Technology } from '~/types/technology'

export const useTechnologies = () => {
  const config = useRuntimeConfig()
  const cache = useState('technologies-cache', () => [] as Technology[])

  if (cache.value.length > 0) {
    return {
      technologies: computed(() => cache.value.map((tech) => ({
        ...tech,
        span: tech.span ?? 4,
      }))),
      pending: ref(false),
      error: ref(null),
    }
  }

  const { data, pending, error } = useFetch<{ status: string; data: Technology[] }>(
    `${config.public.apiBase}/technologies`,
    { key: 'technologies', lazy: true, query: { stack: 'true' } },
  )

  watch(data, (val) => {
    if (val?.data) {
      cache.value = val.data
    }
  }, { immediate: true })

  const technologies = computed<Technology[]>(() => {
    const items = cache.value.length > 0 ? cache.value : data.value?.data ?? []
    return items.map((tech) => ({
      ...tech,
      span: tech.span ?? 4,
    }))
  })

  return { technologies, pending, error }
}
