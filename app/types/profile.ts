export interface Profile {
  id: number
  name: string
  lastname: string
  email: string
  title: string | null
  tagline: string | null
  heroDescription: string | null
  bio: string | null
  availability: boolean | null
  location: string | null
  avatar: string | null
}
