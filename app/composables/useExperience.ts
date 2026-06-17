import type { Experience } from '~/types/experience'

export const useExperience = () => {
  const config = useRuntimeConfig()

  const { data, pending, error } = useFetch<{ status: string; data: Experience[] }>(
    `${config.public.apiBase}/experiences`,
    {
      key: 'experiences',
      lazy: false,
    },
  )

  const experiences = computed<Experience[]>(() =>
    data.value?.data?.map((exp) => ({
      ...exp,
      technologies: Array.isArray(exp.technologies)
        ? exp.technologies.map((t: { name: string }) => t.name)
        : [],
    })) ?? [],
  )

  return {
    experiences,
    pending,
    error,
  }
}
