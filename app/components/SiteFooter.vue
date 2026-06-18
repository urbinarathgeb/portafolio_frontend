<script setup lang="ts">
const route = useRoute()

interface NavItem {
  label: string
  to: string
  exact?: boolean
}

const navItems: NavItem[] = [
  { label: 'INICIO', to: '/', exact: true },
  { label: 'SOBRE MÍ', to: '/about' },
  { label: 'PROYECTOS', to: '/projects' },
  { label: 'STACK', to: '/technologies' },
  { label: 'EXPERIENCIA', to: '/experience' },
  { label: 'CONTACTO', to: '/contact' },
]

function isActive(item: NavItem): boolean {
  if (item.exact) return route.path === item.to
  return route.path.startsWith(item.to)
}
</script>
<template>
  <footer class="fixed bottom-0 right-0 z-40 py-6 px-[5vw] max-md:py-4 max-md:px-4">
    <nav class="flex gap-8 items-center max-md:gap-4 max-md:flex-wrap max-md:justify-end">
      <template v-for="item in navItems" :key="item.to">
        <span
          v-if="isActive(item)"
          class="font-body text-[11px] font-medium tracking-[0.15em] uppercase no-underline relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:h-px after:bg-primary after:transition-all after:duration-300 text-primary after:w-full max-md:text-[10px]"
        >
          {{ item.label }}
        </span>
        <NuxtLink
          v-else
          :to="item.to"
          class="font-body text-[11px] font-medium tracking-[0.15em] uppercase text-toned no-underline transition-all duration-300 relative hover:text-primary after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-px after:bg-primary after:transition-all after:duration-300 hover:after:w-full max-md:text-[10px]"
        >
          {{ item.label }}
        </NuxtLink>
      </template>
    </nav>
  </footer>
</template>