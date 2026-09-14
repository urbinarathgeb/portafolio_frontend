import { projects as projectsData } from '~/data/projects'

export const useProjects = () => ({
  projects: computed(() => projectsData),
})

/** Busca un proyecto por id numérico (ruta actual) o por slug. */
export const useProject = (idOrSlug: number | string) => {
  const found = projectsData.find(
    (p) => String(p.id) === String(idOrSlug) || p.slug === idOrSlug,
  )
  return { project: computed(() => found ?? null) }
}
