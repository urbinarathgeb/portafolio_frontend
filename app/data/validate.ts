import { z } from 'zod'
import { profileSchema, stackGroupSchema, experienceSchema, projectSchema } from './schemas'
import { profile } from './profile'
import { stack } from './stack'
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
    stack: z.array(stackGroupSchema).min(1),
    experiences: z.array(experienceSchema),
    projects: z.array(projectSchema),
  }).safeParse({ profile, stack, experiences, projects })

  if (!result.success) {
    throw new Error(`[content] Contenido inválido:\n${z.prettifyError(result.error)}`)
  }

  unique(projects, (p) => p.id, 'id de proyecto')
  unique(projects, (p) => p.slug, 'slug de proyecto')
  unique(stack, (g) => g.id, 'id de grupo del stack')
  unique(experiences, (e) => e.id, 'id de experiencia')
}
