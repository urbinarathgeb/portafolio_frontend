import { stack } from '~/data/stack'

export const useStack = () => ({
  groups: computed(() => stack),
})
