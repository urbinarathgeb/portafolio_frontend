<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'auth',
  pageTransition: false,
})

const { public: config } = useRuntimeConfig()
const { token } = useAuth()

const stats = ref([
  { label: 'Proyectos', value: '—', icon: 'i-lucide-folder-kanban' },
  { label: 'Experiencias', value: '—', icon: 'i-lucide-timeline' },
  { label: 'Tecnologías', value: '—', icon: 'i-lucide-cpu' },
  { label: 'Contactos', value: '—', icon: 'i-lucide-mail' },
])

const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    const headers: Record<string, string> = {}
    if (token.value) {
      headers.Authorization = `Bearer ${token.value}`
    }

    const [projects, experiences, technologies, contacts] = await Promise.all([
      $fetch(`${config.apiBase}/projects`, { headers }),
      $fetch(`${config.apiBase}/experiences`, { headers }),
      $fetch(`${config.apiBase}/technologies`, { headers }),
      $fetch(`${config.apiBase}/contacts`, { headers }),
    ])

    stats.value = [
      { label: 'Proyectos', value: String((projects as { data?: unknown[] })?.data?.length ?? 0), icon: 'i-lucide-folder-kanban' },
      { label: 'Experiencias', value: String((experiences as { data?: unknown[] })?.data?.length ?? 0), icon: 'i-lucide-timeline' },
      { label: 'Tecnologías', value: String((technologies as { data?: unknown[] })?.data?.length ?? 0), icon: 'i-lucide-cpu' },
      { label: 'Contactos', value: String((contacts as { data?: unknown[] })?.data?.length ?? 0), icon: 'i-lucide-mail' },
    ]
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Error al cargar estadísticas'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <h1 class="font-heading text-2xl font-bold text-highlighted">Panel</h1>
    <p class="text-muted text-sm mt-1">Resumen del portafolio</p>

    <div role="status" aria-live="polite" aria-atomic="true">
      <div v-if="loading" class="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div v-for="i in 4" :key="i" class="h-24 rounded-xl bg-bg-elevated animate-pulse" />
      </div>

      <div v-else-if="error" class="mt-8">
        <UAlert
          color="error"
          variant="subtle"
          title="Error"
          :description="error"
        />
      </div>

      <div v-else class="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="rounded-xl bg-bg-elevated border border-border p-6 flex items-center gap-5 transition-all duration-200 hover:shadow-md hover:border-primary/20 hover:-translate-y-0.5"
      >
        <div class="size-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
          <UIcon :name="stat.icon" class="size-6 text-primary" />
        </div>
        <div>
          <p class="text-2xl font-bold text-highlighted">{{ stat.value }}</p>
          <p class="text-sm text-muted">{{ stat.label }}</p>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>
