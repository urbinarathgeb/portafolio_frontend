import type { Profile } from '~/types/profile'
import type { ApiResponse } from '~/types/project'

export const useProfile = () => {
  const config = useRuntimeConfig()

  const { data, pending, error } = useFetch<ApiResponse<Profile>>(
    `${config.public.apiBase}/profile`,
    {
      key: 'profile',
      lazy: false,
    },
  )

  const profile = computed(() => data.value?.data ?? null)

  return {
    profile,
    pending,
    error,
  }
}
