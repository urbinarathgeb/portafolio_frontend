import { profile } from '~/data/profile'
import { projects as projectsData } from '~/data/projects'
import type { ProjectData } from '~/data/schemas'

// Autor de los proyectos (se muestra en el detalle)
const author = { name: profile.name, lastname: profile.lastname }

const withAuthor = (project: ProjectData) => ({ ...project, user: author })

export const useProjects = () => ({
  projects: computed(() => projectsData.map(withAuthor)),
  pending: ref(false),
  error: ref<Error | null>(null),
})

/** Busca un proyecto por id numérico (ruta actual) o por slug. */
export const useProject = (idOrSlug: number | string) => {
  const found = projectsData.find(
    (p) => String(p.id) === String(idOrSlug) || p.slug === idOrSlug,
  )

  return {
    project: computed(() => (found ? withAuthor(found) : null)),
    pending: ref(false),
    error: ref<Error | null>(found ? null : new Error(`Proyecto no encontrado: ${idOrSlug}`)),
  }
}
