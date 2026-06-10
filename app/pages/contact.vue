<script setup lang="ts">
definePageMeta({
  layout: 'default',
})
</script>

<template>
  <section class="relative min-h-screen flex items-center justify-center bg-default px-4 py-20 overflow-hidden">
    <!-- Stroke text pattern: CONTACTO × 3 con opacidad descendente -->
    <div class="fixed top-[3vh] right-[5vw] pointer-events-none select-none z-0 max-md:right-4">
      <div class="font-heading text-[clamp(4rem,12vw,8rem)] font-bold tracking-[-0.08em] leading-[0.85] stroke-text opacity-[0.15] whitespace-nowrap">
        CONTACTO
      </div>
      <div class="font-heading text-[clamp(4rem,12vw,8rem)] font-bold tracking-[-0.08em] leading-[0.85] stroke-text opacity-[0.08] whitespace-nowrap -mt-[0.3em]">
        CONTACTO
      </div>
      <div class="font-heading text-[clamp(4rem,12vw,8rem)] font-bold tracking-[-0.08em] leading-[0.85] stroke-text opacity-[0.03] whitespace-nowrap -mt-[0.3em]">
        CONTACTO
      </div>
    </div>

    <div class="relative z-10 max-w-4xl w-full section-enter">
      <div class="grid md:grid-cols-2 gap-12">
        <div>
          <p class="text-lg text-muted font-body leading-relaxed mb-8">
            ¿Tenés un proyecto en mente o querés colaborar? Me encantaría saber de vos.
          </p>

          <div class="space-y-4">
            <div class="flex items-center gap-4">
              <UIcon name="i-lucide-mail" class="w-5 h-5 text-primary" />
              <a href="mailto:hola@kako.dev" class="text-toned hover:text-primary transition-colors font-body">
                hola@kako.dev
              </a>
            </div>

            <div class="flex items-center gap-4">
              <UIcon name="i-lucide-map-pin" class="w-5 h-5 text-primary" />
              <span class="text-toned font-body">Buenos Aires, Argentina</span>
            </div>
          </div>
        </div>

        <div>
          <h2 class="text-xl font-heading font-bold text-highlighted mb-6">Redes sociales</h2>
          <div class="flex flex-col gap-4">
            <a
              href="https://github.com/kako"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-4 p-4 rounded-lg bg-elevated border border-border hover:border-primary transition-colors"
            >
              <UIcon name="i-lucide-github" class="w-6 h-6 text-toned" />
              <div>
                <div class="text-highlighted font-body font-medium">GitHub</div>
                <div class="text-sm text-muted font-body">@kako</div>
              </div>
            </a>

            <a
              href="https://linkedin.com/in/kako"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-4 p-4 rounded-lg bg-elevated border border-border hover:border-primary transition-colors"
            >
              <UIcon name="i-lucide-linkedin" class="w-6 h-6 text-toned" />
              <div>
                <div class="text-highlighted font-body font-medium">LinkedIn</div>
                <div class="text-sm text-muted font-body">in/kako</div>
              </div>
            </a>

            <a
              href="https://twitter.com/kako"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-4 p-4 rounded-lg bg-elevated border border-border hover:border-primary transition-colors"
            >
              <UIcon name="i-lucide-twitter" class="w-6 h-6 text-toned" />
              <div>
                <div class="text-highlighted font-body font-medium">Twitter</div>
                <div class="text-sm text-muted font-body">@kako</div>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div class="mt-16 p-6 rounded-lg bg-elevated border border-border">
        <p class="text-sm text-muted font-body text-center">
          Sección en construcción. Formulario de contacto próximamente.
        </p>
      </div>
    </div>
  </section>
</template>
