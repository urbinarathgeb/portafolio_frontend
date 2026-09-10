import { experiences as experiencesData } from '~/data/experience'

export const useExperience = () => ({
  experiences: computed(() => [...experiencesData].sort((a, b) => a.order - b.order)),
  pending: ref(false),
  error: ref<Error | null>(null),
})
