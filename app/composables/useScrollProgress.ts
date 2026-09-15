/** Progreso de scroll de la página (0 a 1). Solo se calcula en el cliente. */
export const useScrollProgress = () => {
  const progress = ref(0)

  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight
    progress.value = max > 0 ? Math.min(1, window.scrollY / max) : 0
  }

  onMounted(() => {
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', update)
    window.removeEventListener('resize', update)
  })

  return progress
}
