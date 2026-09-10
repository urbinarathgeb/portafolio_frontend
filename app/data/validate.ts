import { z } from 'zod'
import { profileSchema, technologySchema, experienceSchema, projectSchema } from './schemas'
import { profile } from './profile'
import { technologies } from './technologies'
import { experiences } from './experience'
import { projects } from './projects'

const unique = <T>(items: T[], key: (item: T) => string | number, label: string) => {
  const seen = new Set<string | number>()
  for (const item of items) {
    const k = key(item)
    if (seen.has(k)) throw new Error(`[content] ${label} duplicado: ${k}`)
    seen.add(k)
  }
}

/**
 * Valida todo el contenido contra sus schemas. Se ejecuta en el hook
 * `build:before` de nuxt.config: un dato inválido rompe el build (y el CI).
 */
export const validateContent = () => {
  const result = z.object({
    profile: profileSchema,
    technologies: z.array(technologySchema),
    experiences: z.array(experienceSchema),
    projects: z.array(projectSchema),
  }).safeParse({ profile, technologies, experiences, projects })

  if (!result.success) {
    throw new Error(`[content] Contenido inválido:\n${z.prettifyError(result.error)}`)
  }

  unique(projects, (p) => p.id, 'id de proyecto')
  unique(projects, (p) => p.slug, 'slug de proyecto')
  unique(technologies, (t) => t.id, 'id de tecnología')
  unique(experiences, (e) => e.id, 'id de experiencia')
}
