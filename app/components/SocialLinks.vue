<template>
  <div class="fixed right-[5vw] top-1/2 -translate-y-1/2 z-40 flex flex-col gap-6 items-center max-md:hidden">
    <div class="w-px h-10 bg-border max-md:h-6" />
    <a
      href="https://github.com/urbinarathgeb"
      target="_blank"
      rel="noopener noreferrer"
      class="flex items-center justify-center w-10 h-10 text-toned transition-all duration-300 hover:text-primary hover:-translate-y-0.5 max-md:w-8 max-md:h-8 max-md:[&_svg]:text-lg"
      aria-label="GitHub"
    >
      <UIcon name="i-lucide-github" class="text-xl" />
    </a>
    <a
      href="https://www.linkedin.com/in/urbinarathgeb"
      target="_blank"
      rel="noopener noreferrer"
      class="flex items-center justify-center w-10 h-10 text-toned transition-all duration-300 hover:text-primary hover:-translate-y-0.5 max-md:w-8 max-md:h-8 max-md:[&_svg]:text-lg"
      aria-label="LinkedIn"
    >
      <UIcon name="i-lucide-linkedin" class="text-xl" />
    </a>
    <div class="w-px h-10 bg-border max-md:h-6" />
  </div>
</template>