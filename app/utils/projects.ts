import type { ProjectData } from '~/data/schemas'

/** Etiqueta visible de cada tipo de proyecto (badge). */
export const PROJECT_KIND_LABEL: Record<ProjectData['kind'], string> = {
  client: 'Cliente real',
  own: 'Proyecto propio',
  academic: 'Proyecto académico',
}
