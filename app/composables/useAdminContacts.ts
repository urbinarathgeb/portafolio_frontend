import type { ApiResponse } from '~/types/project'

export interface Contact {
  id: number
  name: string
  email: string
  message: string
  company: string | null
  interest: string | null
  isRead: boolean
  createdAt: string
  updatedAt: string
}

const interestLabels: Record<string, string> = {
  fulltime: 'Tiempo completo',
  freelance: 'Freelance',
  consultoria: 'Consultoría',
  saludar: 'Saludar',
}

const interestColors: Record<string, string> = {
  fulltime: 'success',
  freelance: 'warning',
  consultoria: 'info',
  saludar: 'neutral',
} as const

export const getInterestLabel = (interest: string | null): string => {
  return interest ? interestLabels[interest] || interest : '—'
}

export const getInterestColor = (interest: string | null): string => {
  return interest ? interestColors[interest] || 'neutral' : 'neutral'
}

export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export const useAdminContacts = () => {
  const { public: config } = useRuntimeConfig()
  const token = useCookie<string | null>('auth-token')
  const contacts = useState<Contact[]>('admin-contacts', () => [])
  const loading = useState('admin-contacts-loading', () => false)
  const error = useState<string | null>('admin-contacts-error', () => null)

  const getHeaders = () => {
    const headers: Record<string, string> = {}
    if (token.value) {
      headers.Authorization = `Bearer ${token.value}`
    }
    return headers
  }

  const fetchAll = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await $fetch<ApiResponse<Contact[]>>(`${config.apiBase}/contacts`, {
        headers: getHeaders(),
      })
      contacts.value = response.data
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Error al cargar mensajes'
      error.value = message
    } finally {
      loading.value = false
    }
  }

  const markAsRead = async (id: number) => {
    try {
      const response = await $fetch<ApiResponse<Contact>>(`${config.apiBase}/contacts/${id}`, {
        method: 'PATCH',
        headers: getHeaders(),
      })
      const idx = contacts.value.findIndex(c => c.id === id)
      if (idx !== -1) {
        contacts.value[idx] = response.data
      }
      return true
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Error al marcar como leído'
      error.value = message
      return false
    }
  }

  return {
    contacts,
    loading: readonly(loading),
    error: readonly(error),
    fetchAll,
    markAsRead,
  }
}
