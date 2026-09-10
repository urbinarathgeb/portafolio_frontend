import { technologies as technologiesData } from '~/data/technologies'

export const useTechnologies = () => ({
  technologies: computed(() => [...technologiesData].sort((a, b) => a.order - b.order)),
  pending: ref(false),
  error: ref<Error | null>(null),
})
