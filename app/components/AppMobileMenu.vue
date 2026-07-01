<script setup lang="ts">
const isOpen = ref(false)
const route = useRoute()

const links = [
  { label: 'INICIO', to: '/' },
  { label: 'SOBRE MÍ', to: '/about' },
  { label: 'PROYECTOS', to: '/projects' },
  { label: 'STACK', to: '/technologies' },
  { label: 'EXPERIENCIA', to: '/experience' },
  { label: 'CONTACTO', to: '/contact' },
]

watch(isOpen, (val) => {
  document.body.style.overflow = val ? 'hidden' : ''
})

function close() {
  isOpen.value = false
}
</script>

<template>
  <div class="md:hidden">
    <button
      class="fixed top-2 right-[4.5rem] z-50 flex flex-col items-center justify-center w-11 h-11 gap-[5px] rounded-lg transition-colors hover:bg-bg-elevated active:bg-bg-elevated"
      :aria-label="isOpen ? 'Cerrar menú' : 'Abrir menú'"
      @click="isOpen = !isOpen"
    >
      <span
        class="block w-5 h-px rounded-full bg-text transition-all duration-300"
        :class="isOpen ? 'translate-y-[6px] rotate-45' : ''"
      />
      <span
        class="block w-5 h-px rounded-full bg-text transition-all duration-300"
        :class="isOpen ? 'opacity-0' : ''"
      />
      <span
        class="block w-5 h-px rounded-full bg-text transition-all duration-300"
        :class="isOpen ? '-translate-y-[6px] -rotate-45' : ''"
      />
    </button>

    <Teleport to="body">
      <Transition name="menu">
        <div
          v-if="isOpen"
          class="fixed inset-0 z-40 flex flex-col bg-default/95 backdrop-blur-md"
          @click.self="close"
        >
          <div class="flex-1 flex flex-col items-center justify-center gap-10 px-8">
            <NuxtLink
              v-for="link in links"
              :key="link.to"
              :to="link.to"
              class="font-heading text-3xl font-bold tracking-[-0.02em] text-toned no-underline transition-all duration-300 hover:text-primary"
              :class="route.path.startsWith(link.to) ? 'gradient-text' : ''"
              @click="close"
            >
              {{ link.label }}
            </NuxtLink>
          </div>

          <div class="flex items-center justify-center gap-6 pb-12">
            <a
              href="https://github.com/urbinarathgeb"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center justify-center w-11 h-11 rounded-lg text-muted transition-colors hover:text-primary hover:bg-bg-elevated"
              aria-label="GitHub"
              @click="close"
            >
              <UIcon name="i-lucide-github" class="text-xl" />
            </a>
            <a
              href="https://www.linkedin.com/in/urbinarathgeb"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center justify-center w-11 h-11 rounded-lg text-muted transition-colors hover:text-primary hover:bg-bg-elevated"
              aria-label="LinkedIn"
              @click="close"
            >
              <UIcon name="i-lucide-linkedin" class="text-xl" />
            </a>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.menu-enter-active,
.menu-leave-active {
  transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.menu-enter-from {
  transform: translateX(100%);
}
.menu-leave-to {
  transform: translateX(100%);
}
</style>
