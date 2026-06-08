<script setup lang="ts">
interface NavItem {
  path: string
  number: string
  label: string
}

const navItems: NavItem[] = [
  { path: '/', number: '01', label: 'Inicio' },
  { path: '/about', number: '02', label: 'Sobre mí' },
  { path: '/projects', number: '03', label: 'Proyectos' },
  { path: '/experience', number: '04', label: 'Experiencia' },
  { path: '/contact', number: '05', label: 'Contacto' },
]

const route = useRoute()

const isActive = (path: string) => {
  if (path === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(path)
}
</script>

<template>
  <nav class="nav-section">
    <NuxtLink
      v-for="item in navItems"
      :key="item.path"
      :to="item.path"
      class="nav-item"
      :class="{ 'nav-item-active': isActive(item.path) }"
    >
      <span class="nav-number">{{ item.number }}</span>
      <span class="nav-line" />
      <span class="nav-label">{{ item.label }}</span>
    </NuxtLink>
  </nav>
</template>

<style scoped>
.nav-section {
  position: fixed;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 40;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease-out;
}

.nav-number {
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  color: var(--ui-text-muted);
  transition: color 0.3s ease-out;
}

.nav-line {
  display: block;
  width: 0;
  height: 1px;
  background-color: var(--ui-text-muted);
  transition: all 0.3s ease-out;
}

.nav-label {
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ui-text-muted);
  opacity: 0;
  transform: translateX(-8px);
  transition: all 0.3s ease-out;
  white-space: nowrap;
}

.nav-item:hover .nav-line {
  width: 1.5rem;
}

.nav-item:hover .nav-label {
  opacity: 1;
  transform: translateX(0);
}

.nav-item:hover .nav-number,
.nav-item:hover .nav-label {
  color: var(--ui-text-toned);
}

.nav-item-active .nav-number,
.nav-item-active .nav-label {
  color: var(--ui-primary);
  font-weight: 700;
}

.nav-item-active .nav-line {
  width: 2rem;
  background-color: var(--ui-primary);
}

@media (max-width: 768px) {
  .nav-section {
    right: 1rem;
    gap: 0.75rem;
  }

  .nav-label {
    display: none;
  }

  .nav-item:hover .nav-line {
    width: 1rem;
  }
}
</style>
