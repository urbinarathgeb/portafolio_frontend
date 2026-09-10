import { z } from 'zod'

// Schemas del contenido del sitio. Los tipos se derivan de acá (z.infer)
// y la validación corre solo en build (ver validate.ts), así que zod no
// llega al bundle del cliente.

export const profileSchema = z.object({
  name: z.string().min(1),
  lastname: z.string().min(1),
  email: z.email(),
  title: z.string().min(1),
  tagline: z.string().min(1),
  heroDescription: z.string().min(1),
  bio: z.string().min(1),
  availability: z.boolean(),
  location: z.string().min(1),
  avatar: z.string().nullable(),
})

export const technologySchema = z.object({
  id: z.number().int(),
  name: z.string().min(1),
  category: z.string().min(1),
  description: z.string().min(1),
  icon: z.string().min(1),
  span: z.number().int().min(1).max(12),
  order: z.number().int(),
})

export const experienceSchema = z.object({
  id: z.number().int(),
  year: z.number().int(),
  role: z.string().min(1),
  company: z.string().min(1),
  location: z.string().min(1),
  description: z.string().min(1),
  order: z.number().int(),
  technologies: z.array(z.string().min(1)),
})

export const caseStudySchema = z.object({
  title: z.string().min(1),
  challenge: z.string().min(1),
  solution: z.string().min(1),
  highlights: z.array(z.object({
    title: z.string().min(1),
    description: z.string().min(1),
  })),
  impact: z.array(z.object({
    stat: z.string().min(1),
    subtitle: z.string().min(1),
    description: z.string().min(1),
  })),
})

export const projectSchema = z.object({
  id: z.number().int(),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().min(1),
  subtitle: z.string().min(1),
  description: z.string().min(1),
  // Ruta local bajo /public (no URLs externas)
  imagePreview: z.string().startsWith('/images/').nullable(),
  githubURLFront: z.url().nullable(),
  githubURLBack: z.url().nullable(),
  deployURL: z.url().nullable(),
  isFeatured: z.boolean(),
  isFrontend: z.boolean(),
  isBackend: z.boolean(),
  techStack: z.array(z.string().min(1)),
  caseStudy: caseStudySchema.nullable(),
  createdAt: z.iso.datetime(),
})

export type ProfileData = z.infer<typeof profileSchema>
export type TechnologyData = z.infer<typeof technologySchema>
export type ExperienceData = z.infer<typeof experienceSchema>
export type CaseStudyData = z.infer<typeof caseStudySchema>
export type ProjectData = z.infer<typeof projectSchema>
