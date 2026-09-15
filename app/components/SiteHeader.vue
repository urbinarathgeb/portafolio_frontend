<script setup lang="ts">
const current = useCurrentSection()
const progress = useScrollProgress()
const route = useRoute()
const open = ref(false)

// En el header van las secciones; "Contratar" lleva a contacto
const NAV = SECTIONS.filter((s) => s.id !== 'inicio' && s.id !== 'contacto')

watch(() => route.fullPath, () => {
  open.value = false
})
</script>

<template>
  <a
    href="#contenido"
    class="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:bg-lime focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-ink"
  >
    Saltar al contenido
  </a>

  <!-- Progreso de lectura -->
  <div class="fixed inset-x-0 top-0 z-[80] h-0.5 bg-line" aria-hidden="true">
    <div class="h-full origin-left bg-lime" :style="{ transform: `scaleX(${progress})` }" />
  </div>

  <header class="sticky top-0 z-[60] flex items-stretch justify-between border-b border-line bg-ink/90 backdrop-blur-md">
    <NuxtLink
      to="/#inicio"
      class="flex min-h-14 items-center gap-2.5 border-r border-line px-[clamp(14px,3vw,26px)] font-mono text-[13px] font-semibold text-paper transition-colors hover:text-lime"
    >
      <span class="inline-block size-[7px] bg-lime animate-blip" aria-hidden="true" />
      J.URBINA
    </NuxtLink>

    <!-- Escritorio -->
    <nav class="hidden items-stretch font-mono text-xs tracking-[0.04em] md:flex" aria-label="Secciones">
      <NuxtLink
        v-for="section in NAV"
        :key="section.id"
        :to="`/#${section.id}`"
        :aria-current="current === section.id ? 'true' : undefined"
        class="flex items-center border-l border-line px-[clamp(10px,1.6vw,18px)] uppercase transition-colors hover:bg-lime hover:text-ink"
        :class="current === section.id ? 'text-lime' : 'text-mute'"
      >
        {{ section.label }}
      </NuxtLink>
      <NuxtLink
        to="/#contacto"
        class="flex items-center border-l border-line bg-lime px-[clamp(13px,2.4vw,22px)] font-semibold uppercase text-ink transition-colors hover:bg-paper"
      >
        Contratar
      </NuxtLink>
    </nav>

    <!-- Móvil -->
    <div class="flex items-stretch md:hidden">
      <NuxtLink
        to="/#contacto"
        class="flex items-center border-l border-line bg-lime px-4 font-mono text-xs font-semibold uppercase text-ink"
      >
        Contratar
      </NuxtLink>
      <button
        type="button"
        class="flex min-w-[76px] items-center justify-center border-l border-line px-4 font-mono text-xs uppercase text-paper"
        :aria-expanded="open"
        aria-controls="menu-movil"
        @click="open = !open"
      >
        {{ open ? 'Cerrar' : 'Menú' }}
      </button>
    </div>
  </header>

  <nav
    v-show="open"
    id="menu-movil"
    class="fixed inset-x-0 top-14 z-[55] border-b border-line bg-ink/95 backdrop-blur-md md:hidden"
    aria-label="Secciones"
  >
    <NuxtLink
      v-for="section in SECTIONS"
      :key="section.id"
      :to="`/#${section.id}`"
      :aria-current="current === section.id ? 'true' : undefined"
      class="flex min-h-14 items-center justify-between border-t border-line px-5 font-mono text-sm uppercase"
      :class="current === section.id ? 'text-lime' : 'text-paper'"
      @click="open = false"
    >
      {{ section.label }}
      <span aria-hidden="true">→</span>
    </NuxtLink>
  </nav>
</template>
