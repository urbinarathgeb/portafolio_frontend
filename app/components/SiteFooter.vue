<script setup lang="ts">
const current = useCurrentSection()
</script>

<template>
  <footer class="fixed bottom-0 right-0 z-40 py-6 px-[5vw] max-md:py-4 max-md:px-4">
    <nav class="hidden md:flex gap-7 items-center" aria-label="Secciones">
      <NuxtLink
        v-for="section in SECTIONS"
        :key="section.id"
        :to="`/#${section.id}`"
        :aria-current="current === section.id ? 'true' : undefined"
        class="font-body text-[13px] font-medium no-underline relative transition-colors duration-300 after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:h-px after:bg-primary after:transition-all after:duration-300 hover:text-primary hover:after:w-full"
        :class="current === section.id ? 'text-primary after:w-full' : 'text-toned after:w-0'"
      >
        {{ section.label }}
      </NuxtLink>
    </nav>
    <div class="flex md:hidden items-center gap-4">
      <a
        href="https://github.com/urbinarathgeb"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center justify-center w-10 h-10 rounded-lg text-muted transition-colors hover:text-primary hover:bg-bg-elevated"
        aria-label="GitHub"
      >
        <UIcon name="i-lucide-github" class="text-xl" />
      </a>
      <a
        href="https://www.linkedin.com/in/urbinarathgeb"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center justify-center w-10 h-10 rounded-lg text-muted transition-colors hover:text-primary hover:bg-bg-elevated"
        aria-label="LinkedIn"
      >
        <UIcon name="i-lucide-linkedin" class="text-xl" />
      </a>
    </div>
  </footer>
</template>
