<template>
  <div class="min-h-screen bg-ink bg-blueprint text-paper overflow-x-clip">
    <SiteHeader />
    <main id="contenido">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>
