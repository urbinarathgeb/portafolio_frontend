import type { Profile } from '~/types/profile'
import type { ApiResponse } from '~/types/project'

export const useProfile = () => {
  const config = useRuntimeConfig()
  const profile = useState<Profile | null>('profile', () => null)

  if (profile.value) {
    return {
      profile: readonly(profile),
      pending: ref(false),
      error: ref(null),
    }
  }

  const { data, pending, error } = useFetch<ApiResponse<Profile>>(
    `${config.public.apiBase}/profile`,
    {
      key: 'profile-fetch',
      lazy: true,
      server: false,
    },
  )

  watch(data, (val) => {
    if (val?.data) {
      profile.value = val.data
    }
  }, { immediate: true })

  return {
    profile: computed(() => profile.value || data.value?.data || null),
    pending,
    error,
  }
}
