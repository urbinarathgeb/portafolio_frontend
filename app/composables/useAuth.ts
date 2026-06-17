export interface LoginCredentials {
  email: string
  password: string
}

export const useAuth = () => {
  const { public: config } = useRuntimeConfig()

  const token = useCookie<string | null>('auth-token', {
    default: () => null,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24,
  })

  const user = useState<{ id: number; email: string; name: string } | null>('auth-user', () => null)
  const loading = useState('auth-loading', () => false)
  const error = useState<string | null>('auth-error', () => null)

  const isAuthenticated = computed(() => !!token.value)

  const login = async (credentials: LoginCredentials) => {
    loading.value = true
    error.value = null

    try {
      interface LoginResponse {
        status: string
        message: string
        data: {
          token: string
          user: { id: number; email: string; name: string }
        }
      }

      const response = await $fetch<LoginResponse>(`${config.apiBase}/auth/login`, {
        method: 'POST',
        body: {
          email: credentials.email,
          password: credentials.password,
        },
      })

      token.value = response.data.token
      user.value = response.data.user
      return true
    } catch (e: unknown) {
      if (e instanceof Error) {
        error.value = e.message
      } else {
        error.value = 'Credenciales inválidas'
      }
      return false
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    token.value = null
    user.value = null
    navigateTo('/admin/login')
  }

  const setAuthFromCookie = () => {
    if (token.value && !user.value) {
      const payload = token.value.split('.')[1]
      try {
        const decoded = JSON.parse(atob(payload))
        user.value = { id: decoded.id, email: decoded.email, name: decoded.name }
      } catch {
        token.value = null
      }
    }
  }

  return {
    token: readonly(token),
    user: readonly(user),
    loading: readonly(loading),
    error: readonly(error),
    isAuthenticated,
    login,
    logout,
    setAuthFromCookie,
  }
}
