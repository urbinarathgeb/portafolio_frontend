export interface ProjectUser {
  name: string
  lastname: string
}

export interface Project {
  id: number
  title: string
  subtitle: string
  description: string
  imagePreview: string | null
  githubURL: string | null
  deployURL: string | null
  isFeatured: boolean
  userId: number
  user: ProjectUser
  createdAt: string
  updatedAt: string
}

export interface ApiResponse<T> {
  status: 'success' | 'error'
  message: string
  data: T
}
