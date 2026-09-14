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

// Caso de estudio: contexto → qué construí → decisiones (con su porqué) →
// resultado verificable → qué haría distinto (opcional, mientras se escribe).
export const caseStudySchema = z.object({
  context: z.string().min(1),
  built: z.string().min(1),
  decisions: z.array(z.object({
    title: z.string().min(1),
    body: z.string().min(1),
  })).min(1),
  result: z.array(z.string().min(1)).min(1),
  learnings: z.string().min(1).optional(),
})

export const projectSchema = z.object({
  id: z.number().int(),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  // Tipo de proyecto: se muestra como badge y ordena la jerarquía visual
  kind: z.enum(['client', 'own', 'academic']),
  title: z.string().min(1),
  subtitle: z.string().min(1),
  // Resumen de una línea: tarjeta de la landing y metadatos de la página
  description: z.string().min(1),
  role: z.enum(['Full Stack', 'Frontend', 'Backend']),
  year: z.number().int().min(2000).max(2100),
  status: z.string().min(1).optional(),
  // Ruta local bajo /public (no URLs externas)
  imagePreview: z.string().startsWith('/images/'),
  links: z.object({
    repo: z.url().optional(),
    repoBackend: z.url().optional(),
    demo: z.url().optional(),
  }),
  isFeatured: z.boolean(),
  techStack: z.array(z.string().min(1)).min(1),
  caseStudy: caseStudySchema,
})

export type ProfileData = z.infer<typeof profileSchema>
export type TechnologyData = z.infer<typeof technologySchema>
export type ExperienceData = z.infer<typeof experienceSchema>
export type CaseStudyData = z.infer<typeof caseStudySchema>
export type ProjectData = z.infer<typeof projectSchema>
