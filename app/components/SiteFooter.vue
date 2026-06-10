<script setup lang="ts">
</script>
<template>
  <footer class="fixed bottom-0 right-0 z-40 py-6 px-[5vw] max-md:py-4 max-md:px-4">
    <nav class="flex gap-8 items-center max-md:gap-4 max-md:flex-wrap max-md:justify-end">
      <NuxtLink
        to="/"
        class="font-body text-[11px] font-medium tracking-[0.15em] uppercase text-toned no-underline transition-all duration-300 relative hover:text-primary after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-px after:bg-primary after:transition-all after:duration-300 hover:after:w-full router-link-active:text-primary max-md:text-[10px]"
      >
        INICIO
      </NuxtLink>

      <NuxtLink
        to="/about"
        class="font-body text-[11px] font-medium tracking-[0.15em] uppercase text-toned no-underline transition-all duration-300 relative hover:text-primary after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-px after:bg-primary after:transition-all after:duration-300 hover:after:w-full router-link-active:text-primary max-md:text-[10px]"
      >
        SOBRE MÍ
      </NuxtLink>

      <NuxtLink
        to="/projects"
        class="font-body text-[11px] font-medium tracking-[0.15em] uppercase text-toned no-underline transition-all duration-300 relative hover:text-primary after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-px after:bg-primary after:transition-all after:duration-300 hover:after:w-full router-link-active:text-primary max-md:text-[10px]"
      >
        PROYECTOS
      </NuxtLink>

      <NuxtLink
          to="/technologies"
          class="font-body text-[11px] font-medium tracking-[0.15em] uppercase text-toned no-underline transition-all duration-300 relative hover:text-primary after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-px after:bg-primary after:transition-all after:duration-300 hover:after:w-full router-link-active:text-primary max-md:text-[10px]"
      >
        STACK
      </NuxtLink>

      <NuxtLink
        to="/experience"
        class="font-body text-[11px] font-medium tracking-[0.15em] uppercase text-toned no-underline transition-all duration-300 relative hover:text-primary after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-px after:bg-primary after:transition-all after:duration-300 hover:after:w-full router-link-active:text-primary max-md:text-[10px]"
      >
        EXPERIENCIA
      </NuxtLink>

      <NuxtLink
        to="/contact"
        class="font-body text-[11px] font-medium tracking-[0.15em] uppercase text-toned no-underline transition-all duration-300 relative hover:text-primary after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-px after:bg-primary after:transition-all after:duration-300 hover:after:w-full router-link-active:text-primary max-md:text-[10px]"
      >
        CONTACTO
      </NuxtLink>
    </nav>
  </footer>
</template>