<script setup lang="ts">
const { user, logout } = useAuth()
const route = useRoute()

const navItems = [
  { label: 'Panel', icon: 'i-lucide-layout-dashboard', to: '/admin' },
  { label: 'Proyectos', icon: 'i-lucide-folder-kanban', to: '/admin/projects' },
  { label: 'Experiencia', icon: 'i-lucide-timeline', to: '/admin/experiences' },
  { label: 'Tecnologías', icon: 'i-lucide-cpu', to: '/admin/technologies' },
  { label: 'Servicios', icon: 'i-lucide-concierge-bell', to: '/admin/services' },
  { label: 'Contactos', icon: 'i-lucide-mail', to: '/admin/contacts' },
  { label: 'Perfil', icon: 'i-lucide-user', to: '/admin/profile' },
  { label: 'Imágenes', icon: 'i-lucide-image', to: '/admin/images' },
]

const sidebarOpen = ref(false)

const isActive = (itemTo: string) => {
  if (itemTo === '/admin') return route.path === '/admin'
  return route.path.startsWith(itemTo)
}

const pageTitle = computed(() => {
  const path = route.path
  if (path === '/admin') return 'Panel'
  if (path.startsWith('/admin/projects')) return 'Proyectos'
  if (path.startsWith('/admin/experiences')) return 'Experiencia'
  if (path.startsWith('/admin/technologies')) return 'Tecnologías'
  if (path.startsWith('/admin/services')) return 'Servicios'
  if (path.startsWith('/admin/contacts')) return 'Contactos'
  if (path.startsWith('/admin/profile')) return 'Perfil'
  if (path.startsWith('/admin/images')) return 'Imágenes'
  return 'Admin'
})

const userMenuItems = [
  [{
    label: 'Perfil',
    icon: 'i-lucide-user',
    click: () => navigateTo('/admin/profile'),
  }],
  [{
    label: 'Cerrar sesión',
    icon: 'i-lucide-log-out',
    click: () => logout(),
  }],
]
</script>

<template>
  <div class="min-h-screen bg-default">
    <!-- Mobile overlay -->
    <div
      v-if="sidebarOpen"
      class="fixed inset-0 z-45 bg-black/70 lg:hidden"
      @click="sidebarOpen = false"
    />

    <!-- Sidebar (always fixed, slides in/out on mobile) -->
    <aside
      class="fixed inset-y-0 left-0 w-64 bg-white dark:bg-[#1A1C1C] border-r border-border flex flex-col transition-transform duration-300 lg:translate-x-0"
      :class="[sidebarOpen ? 'translate-x-0 z-50' : '-translate-x-full z-30']"
    >
      <!-- Close button (mobile) -->
      <div class="absolute top-4 right-4 lg:hidden">
        <UButton
          color="neutral"
          variant="ghost"
          icon="i-lucide-x"
          size="sm"
          @click="sidebarOpen = false"
        />
      </div>

      <!-- Logo -->
      <div class="px-5 py-5 border-b border-border">
        <NuxtLink to="/admin" class="flex items-center gap-3 no-underline">
          <div class="size-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold font-heading text-sm">
            P
          </div>
          <div>
            <p class="font-heading text-base font-bold text-highlighted leading-tight">Portafolio</p>
            <p class="text-[11px] text-muted tracking-widest uppercase">Admin</p>
          </div>
        </NuxtLink>
      </div>

      <!-- Nav -->
      <nav class="flex-1 overflow-y-auto px-3 py-5 space-y-1">
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-toned no-underline transition-all duration-200 hover:bg-bg-accented hover:text-highlighted group"
          :class="{
            'bg-primary/[8%] text-primary hover:bg-primary/[12%] hover:text-primary font-semibold': isActive(item.to),
          }"
          @click="sidebarOpen = false"
        >
          <UIcon
            :name="item.icon"
            class="size-5 shrink-0 transition-all duration-200"
            :class="{ 'text-primary': isActive(item.to) }"
          />
          <span>{{ item.label }}</span>
        </NuxtLink>
      </nav>

      <!-- Gradient accent -->
      <div class="h-[3px] w-full bg-gradient-to-r from-primary via-secondary to-accent shrink-0" />

      <!-- User section -->
      <div class="px-3 py-4">
        <div class="flex items-center gap-3 px-3 py-2">
          <div class="size-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm shrink-0">
            {{ user?.name?.charAt(0)?.toUpperCase() || 'A' }}
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-highlighted truncate">{{ user?.name || 'Admin' }}</p>
            <p class="text-[11px] text-muted truncate">{{ user?.email }}</p>
          </div>
        </div>
        <UButton
          color="neutral"
          variant="ghost"
          block
          size="sm"
          class="mt-1"
          @click="logout"
        >
          <template #leading>
            <UIcon name="i-lucide-log-out" class="size-4" />
          </template>
          Cerrar sesión
        </UButton>
      </div>
    </aside>

    <!-- Header (always fixed, offset by sidebar width on desktop) -->
    <header class="fixed top-0 right-0 left-0 z-40 lg:left-64 bg-default/80 backdrop-blur-md border-b border-border">
      <div class="flex items-center justify-between px-4 lg:px-8 h-14">
        <div class="flex items-center gap-3">
          <UButton
            color="neutral"
            variant="ghost"
            icon="i-lucide-menu"
            class="lg:hidden"
            @click="sidebarOpen = true"
          />
          <div>
            <h1 class="font-heading text-lg font-bold text-highlighted">{{ pageTitle }}</h1>
          </div>
        </div>

        <ClientOnly>
          <UDropdownMenu :items="userMenuItems" :content="{ side: 'bottom', align: 'end' }">
            <UButton color="neutral" variant="ghost" class="flex items-center gap-2 px-2">
              <div class="size-7 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                {{ user?.name?.charAt(0)?.toUpperCase() || 'A' }}
              </div>
              <span class="text-sm text-highlighted hidden sm:inline">{{ user?.name }}</span>
              <UIcon name="i-lucide-chevron-down" class="size-4 text-muted hidden sm:block" />
            </UButton>
          </UDropdownMenu>
          <template #fallback>
            <UButton color="neutral" variant="ghost" class="flex items-center gap-2 px-2">
              <div class="size-7 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                {{ user?.name?.charAt(0)?.toUpperCase() || 'A' }}
              </div>
              <span class="text-sm text-highlighted hidden sm:inline">{{ user?.name }}</span>
            </UButton>
          </template>
        </ClientOnly>
      </div>
    </header>

    <!-- Page content (offset by header + sidebar) -->
    <main class="min-h-screen pt-14 lg:ml-64">
      <div class="max-w-7xl mx-auto w-full px-4 lg:px-8 py-6 lg:py-8">
        <slot />
      </div>
    </main>
  </div>
</template>
