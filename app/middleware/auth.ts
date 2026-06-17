export default defineNuxtRouteMiddleware((to) => {
  if (!to.path.startsWith('/admin')) return
  if (to.path === '/admin/login') return

  const { isAuthenticated, setAuthFromCookie } = useAuth()

  setAuthFromCookie()

  if (!isAuthenticated.value) {
    return navigateTo('/admin/login')
  }
})
