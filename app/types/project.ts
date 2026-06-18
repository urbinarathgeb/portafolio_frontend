import type { Technology } from '~/types/technology'

export interface ProjectUser {
  name: string
  lastname: string
}

export interface CaseStudy {
  title: string
  challenge: string
  solution: string
  highlights: { title: string; description: string }[]
  impact: { stat: string; subtitle: string; description: string }[]
}

export interface Project {
  id: number
  title: string
  subtitle: string
  description: string
  imagePreview: string | null
  githubURLFront: string | null
  githubURLBack: string | null
  deployURL: string | null
  isFeatured: boolean
  isFrontend: boolean
  isBackend: boolean
  caseStudy: CaseStudy | null
  techStack: string[]
  techStackDetails?: Technology[]
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
