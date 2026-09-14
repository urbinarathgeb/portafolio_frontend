import type { StackGroupData } from './schemas'

// Una columna por grupo en la sección Stack. Los grupos que no son de
// aprendizaje alimentan también la cinta animada bajo el hero.
export const stack: StackGroupData[] = [
  { id: 'lenguajes', label: 'Lenguajes', items: ['JavaScript', 'TypeScript', 'SQL'] },
  { id: 'frontend', label: 'Frontend', items: ['Vue.js', 'Nuxt', 'React', 'Tailwind CSS'] },
  { id: 'backend', label: 'Backend', items: ['Node.js', 'Express', 'PostgreSQL', 'REST APIs'] },
  { id: 'aprendiendo', label: 'Aprendiendo', learning: true, items: ['Docker', 'Testing', 'CI/CD'] },
]
