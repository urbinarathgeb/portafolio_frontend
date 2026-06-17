<script setup lang="ts">
import type { ContactForm } from '~/composables/useContact'

definePageMeta({
  layout: 'default',
})

const toast = useToast()
const { form, loading, error, success, submit, reset } = useContact()

const handleSubmit = async () => {
  const ok = await submit()
  if (ok) {
    toast.add({ title: 'Mensaje enviado', description: 'Te respondo a la brevedad.', color: 'success' })
  } else if (error.value) {
    toast.add({ title: 'Error', description: error.value, color: 'error' })
  }
}
</script>

<template>
  <section class="relative min-h-screen flex items-center bg-default overflow-hidden">
    <!-- Stroke text pattern: CONTACTO × 3 -->
    <div class="fixed top-[3vh] right-[5vw] pointer-events-none select-none z-0 max-md:hidden">
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

    <div class="relative z-10 w-full max-w-7xl mx-auto px-[5vw] py-20 section-enter">
      <div class="grid lg:grid-cols-12 gap-12 items-start">
        <!-- Columna izquierda: Info -->
        <div class="lg:col-span-6 flex flex-col gap-6">
          <h1 class="font-heading font-bold tracking-[-0.02em] flex flex-col">
            <span class="font-black text-highlighted text-[clamp(2rem,4vw,3.5rem)]">Trabajemos</span>
            <span class="font-black gradient-text text-[clamp(2.5rem,6vw,4.5rem)] -mt-5">juntos.</span>
          </h1>

          <p class="text-base text-muted font-body leading-relaxed max-w-md">
            Busco mi próxima posición full-time en un equipo donde el craft importa. Si estás construyendo algo que vale la pena, quiero escucharte.
          </p>

          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-elevated border border-border w-fit">
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span class="text-sm font-body text-highlighted">Disponible ahora</span>
            <span class="text-sm font-body text-muted">· Santiago, Chile (remoto ok)</span>
          </div>

          <div class="flex flex-col gap-3 mt-2">
            <a
              href="mailto:urbinarathgeb@gmail.com"
              class="flex items-center gap-4 px-4 py-3 rounded-lg bg-elevated border border-border hover:border-primary transition-colors group"
            >
              <UIcon name="i-lucide-mail" class="w-5 h-5 text-primary shrink-0" />
              <div class="flex flex-col min-w-0">
                <span class="text-sm font-body text-muted">Email</span>
                <span class="text-sm font-body text-highlighted truncate">urbinarathgeb@gmail.com</span>
              </div>
              <UIcon
                name="i-lucide-arrow-up-right"
                class="w-4 h-4 text-muted ml-auto shrink-0 group-hover:text-primary transition-colors"
              />
            </a>

            <a
              href="https://github.com/urbinarathgeb"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-4 px-4 py-3 rounded-lg bg-elevated border border-border hover:border-primary transition-colors group"
            >
              <UIcon name="i-lucide-github" class="w-5 h-5 text-primary shrink-0" />
              <div class="flex flex-col min-w-0">
                <span class="text-sm font-body text-muted">GitHub</span>
                <span class="text-sm font-body text-highlighted truncate">@urbinarathgeb</span>
              </div>
              <UIcon
                name="i-lucide-arrow-up-right"
                class="w-4 h-4 text-muted ml-auto shrink-0 group-hover:text-primary transition-colors"
              />
            </a>

            <a
              href="https://linkedin.com/in/javierkako"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-4 px-4 py-3 rounded-lg bg-elevated border border-border hover:border-primary transition-colors group"
            >
              <UIcon name="i-lucide-linkedin" class="w-5 h-5 text-primary shrink-0" />
              <div class="flex flex-col min-w-0">
                <span class="text-sm font-body text-muted">LinkedIn</span>
                <span class="text-sm font-body text-highlighted truncate">Javier Urbina</span>
              </div>
              <UIcon
                name="i-lucide-arrow-up-right"
                class="w-4 h-4 text-muted ml-auto shrink-0 group-hover:text-primary transition-colors"
              />
            </a>
          </div>
        </div>

        <!-- Columna derecha: Formulario -->
        <div class="lg:col-span-6 lg:self-center">
          <form class="flex flex-col gap-5" @submit.prevent="handleSubmit">
            <!-- Nombre + Email -->
            <div class="grid sm:grid-cols-2 gap-5">
              <div class="flex flex-col gap-2">
                <label class="text-xs font-mono uppercase tracking-wide text-muted">Nombre</label>
                <input
                  v-model="form.nombre"
                  type="text"
                  placeholder="Tu nombre"
                  class="px-4 py-3 rounded-lg bg-elevated border border-border text-sm font-body text-highlighted placeholder:text-muted/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
                />
              </div>
              <div class="flex flex-col gap-2">
                <label class="text-xs font-mono uppercase tracking-wide text-muted">Email</label>
                <input
                  v-model="form.email"
                  type="email"
                  placeholder="tu@email.com"
                  class="px-4 py-3 rounded-lg bg-elevated border border-border text-sm font-body text-highlighted placeholder:text-muted/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
                />
              </div>
            </div>

            <!-- Empresa / Proyecto -->
            <div class="flex flex-col gap-2">
              <label class="text-xs font-mono uppercase tracking-wide text-muted">Empresa / Proyecto</label>
              <input
                v-model="form.empresa"
                type="text"
                placeholder="¿Dónde trabajás?"
                class="px-4 py-3 rounded-lg bg-elevated border border-border text-sm font-body text-highlighted placeholder:text-muted/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
              />
            </div>

            <!-- Tipo de interés -->
            <div class="flex flex-col gap-2">
              <label class="text-xs font-mono uppercase tracking-wide text-muted">¿En qué estás pensando?</label>
              <div class="flex flex-wrap gap-2">
                <label
                  v-for="option in [
                    { value: 'fulltime', label: 'Posición full-time' },
                    { value: 'freelance', label: 'Proyecto freelance' },
                    { value: 'consultoria', label: 'Consultoría' },
                    { value: 'saludar', label: 'Solo quiero saludar 👋' },
                  ]"
                  :key="option.value"
                  class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-elevated border border-border cursor-pointer transition-all has-[:checked]:bg-primary/10 has-[:checked]:border-primary has-[:checked]:text-primary"
                >
                  <input
                    v-model="form.interest"
                    type="radio"
                    name="interest"
                    :value="option.value"
                    class="sr-only"
                  />
                  <span class="text-sm font-body">{{ option.label }}</span>
                </label>
              </div>
            </div>

            <!-- Mensaje -->
            <div class="flex flex-col gap-2">
              <label class="text-xs font-mono uppercase tracking-wide text-muted">Mensaje</label>
              <textarea
                v-model="form.mensaje"
                rows="4"
                placeholder="Cuéntame sobre tu equipo, el proyecto, o lo que necesitás. Sin filtros."
                class="px-4 py-3 rounded-lg bg-elevated border border-border text-sm font-body text-highlighted placeholder:text-muted/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all resize-none"
              ></textarea>
            </div>

            <!-- Botón -->
            <button
              type="submit"
              :disabled="loading"
              class="w-full px-8 py-4 rounded-lg bg-primary text-white font-body font-medium text-sm uppercase tracking-wide hover:glow-shadow-primary hover:-translate-y-0.5 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ loading ? 'Enviando...' : 'Enviar mensaje' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>