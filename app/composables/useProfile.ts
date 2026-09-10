import { profile as profileData } from '~/data/profile'

// El contenido vive en el repo: no hay carga ni errores de red.
// Se mantiene la forma { data, pending, error } para no tocar las páginas.
export const useProfile = () => ({
  profile: computed(() => profileData),
  pending: ref(false),
  error: ref<Error | null>(null),
})
