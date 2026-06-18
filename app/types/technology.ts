export interface Technology {
  id: number
  name: string
  category: string
  description: string
  icon: string
  span: number
  order: number
}

export interface ApiResponse<T> {
  status: 'success' | 'error'
  message: string
  data: T
}
