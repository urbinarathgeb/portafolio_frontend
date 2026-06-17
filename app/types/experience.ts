export interface Experience {
  id: number
  year: number
  role: string
  company: string
  location: string
  description: string
  order: number
  technologies: string[]
}

export interface ApiResponse<T> {
  status: 'success' | 'error'
  message: string
  data: T
}
