import type { Profile } from '~/types/profile'

export interface ProfileForm {
  name: string
  lastname: string
  email: string
  title: string
  tagline: string
  heroDescription: string
  bio: string
  availability: boolean
  location: string
  avatar: string
}

export interface PasswordForm {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

const initialProfileForm: ProfileForm = {
  name: '',
  lastname: '',
  email: '',
  title: '',
  tagline: '',
  heroDescription: '',
  bio: '',
  availability: false,
  location: '',
  avatar: '',
}

export const useAdminProfile = () => {
  const { public: config } = useRuntimeConfig()
  const token = useCookie<string | null>('auth-token')

  const profile = useState<Profile | null>('admin-profile', () => null)
  const loading = useState('admin-profile-loading', () => false)
  const profileSubmitting = useState('admin-profile-submitting', () => false)
  const passwordSubmitting = useState('admin-password-submitting', () => false)
  const error = useState<string | null>('admin-profile-error', () => null)

  const getHeaders = () => {
    const headers: Record<string, string> = {}
    if (token.value) headers.Authorization = `Bearer ${token.value}`
    return headers
  }

  const fetchProfile = async () => {
    loading.value = true
    error.value = null
    try {
      const res = await $fetch<ApiResponse<Profile>>(`${config.apiBase}/profile`, { headers: getHeaders() })
      profile.value = res.data
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'Error al cargar perfil'
    } finally {
      loading.value = false
    }
  }

  const updateProfile = async (form: ProfileForm): Promise<boolean> => {
    profileSubmitting.value = true
    error.value = null
    try {
      const res = await $fetch<ApiResponse<Profile>>(`${config.apiBase}/profile`, {
        method: 'PATCH',
        headers: getHeaders(),
        body: {
          ...form,
          title: form.title || undefined,
          tagline: form.tagline || undefined,
          heroDescription: form.heroDescription || undefined,
          bio: form.bio || undefined,
          location: form.location || undefined,
          avatar: form.avatar || undefined,
        },
      })
      profile.value = res.data
      return true
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'Error al actualizar perfil'
      return false
    } finally {
      profileSubmitting.value = false
    }
  }

  const changePassword = async (currentPassword: string, newPassword: string): Promise<boolean> => {
    passwordSubmitting.value = true
    error.value = null
    try {
      await $fetch(`${config.apiBase}/auth/password`, {
        method: 'PATCH',
        headers: getHeaders(),
        body: { currentPassword, newPassword },
      })
      return true
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'Error al cambiar contraseña'
      return false
    } finally {
      passwordSubmitting.value = false
    }
  }

  const profileToForm = (p: Profile): ProfileForm => ({
    name: p.name,
    lastname: p.lastname,
    email: p.email,
    title: p.title || '',
    tagline: p.tagline || '',
    heroDescription: p.heroDescription || '',
    bio: p.bio || '',
    availability: p.availability ?? false,
    location: p.location || '',
    avatar: p.avatar || '',
  })

  return {
    profile,
    loading: readonly(loading),
    profileSubmitting: readonly(profileSubmitting),
    passwordSubmitting: readonly(passwordSubmitting),
    error: readonly(error),
    fetchProfile,
    updateProfile,
    changePassword,
    profileToForm,
  }
}
