// Secciones de la landing, en orden. El id es el ancla (/#id).
export const SECTIONS = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'stack', label: 'Stack' },
  { id: 'experiencia', label: 'Experiencia' },
  { id: 'sobre-mi', label: 'Sobre mí' },
  { id: 'contacto', label: 'Contacto' },
] as const

export type SectionId = (typeof SECTIONS)[number]['id']

/** Sección visible en pantalla (compartida por la navegación). */
export const useActiveSection = () => useState<SectionId | null>('active-section', () => null)

/**
 * Sección "actual" para la navegación: en la landing, la visible;
 * en el detalle de un proyecto, "proyectos".
 */
export const useCurrentSection = () => {
  const route = useRoute()
  const active = useActiveSection()
  return computed<SectionId | null>(() => {
    if (route.path === '/') return active.value
    if (route.path.startsWith('/projects/')) return 'proyectos'
    return null
  })
}

/**
 * Observa las secciones de la landing y actualiza la activa (scroll-spy).
 * Se llama una vez, desde la página que contiene las secciones.
 */
export const useSectionObserver = () => {
  const active = useActiveSection()
  let observer: IntersectionObserver | undefined

  onMounted(() => {
    // Una sección es "activa" cuando cruza la franja central de la pantalla
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) active.value = entry.target.id as SectionId
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    for (const { id } of SECTIONS) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
    active.value = null
  })
}
