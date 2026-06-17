import type { Technology } from '~/types/technology'

export const useTechnologies = () => {
  const config = useRuntimeConfig()

  const { data, pending, error } = useFetch<{ status: string; data: Technology[] }>(
    `${config.public.apiBase}/technologies`,
    {
      key: 'technologies',
      lazy: false,
      query: { stack: 'true' },
    },
  )

  const technologies = computed<Technology[]>(() =>
    data.value?.data?.map((tech) => ({
      ...tech,
      span: tech.span ?? 4,
    })) ?? [],
  )

  return {
    technologies,
    pending,
    error,
  }
}
