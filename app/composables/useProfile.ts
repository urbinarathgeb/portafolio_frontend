import type { Profile } from '~/types/profile'

export const useProfile = () => {
  const config = useRuntimeConfig()

  const { data, pending, error } = useFetch<{ status: string; data: Profile }>(
    `${config.public.apiBase}/profile`,
    {
      key: 'profile',
      lazy: true,
    },
  )

  const profile = computed(() => data.value?.data ?? null)

  return {
    profile,
    pending,
    error,
  }
}
