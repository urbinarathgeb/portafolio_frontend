<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'auth',
  pageTransition: false,
})

const route = useRoute()
const isList = computed(() => route.path === '/admin/technologies')

const { technologies, loading, error, fetchAll, remove } = useAdminTechnologies()
const toast = useToast()
const deleting = ref<number | null>(null)

const groupedByCategory = computed(() => {
  const groups: Record<string, AdminTechnology[]> = {}
  for (const tech of technologies.value) {
    const cat = tech.category || 'Sin categoría'
    if (!groups[cat]) groups[cat] = []
    groups[cat].push(tech)
  }
  return groups
})

const categoryKeys = computed(() => Object.keys(groupedByCategory.value).sort())

onMounted(() => {
  fetchAll()
})

const confirmDelete = async (id: number, name: string) => {
  if (!confirm(`¿Eliminar "${name}"? Esta acción no se puede deshacer.`)) return
  deleting.value = id
  const success = await remove(id)
  deleting.value = null
  if (success) {
    toast.add({ title: 'Tecnología eliminada', color: 'success' })
  } else {
    toast.add({ title: 'Error', description: 'No se pudo eliminar la tecnología', color: 'error' })
  }
}
</script>

<template>
  <div>
    <template v-if="isList">
      <div class="flex items-center justify-between mb-1">
        <h1 class="font-heading text-2xl font-bold text-highlighted">Tecnologías</h1>
        <UButton color="primary" @click="navigateTo('/admin/technologies/create')">
          <template #leading>
            <UIcon name="i-lucide-plus" class="size-4" />
          </template>
          Nueva tecnología
        </UButton>
      </div>
      <p class="text-muted text-sm">Gestiona las tecnologías del portafolio</p>

      <div role="status" aria-live="polite" aria-atomic="true">
        <div v-if="loading" class="mt-8 space-y-3">
          <div v-for="i in 4" :key="i" class="h-20 rounded-xl bg-bg-elevated animate-pulse" />
        </div>

        <UAlert
          v-else-if="error"
          color="error"
          variant="subtle"
          title="Error"
          :description="error"
          class="mt-8"
        />

        <div v-else-if="technologies.length === 0" class="mt-8">
          <UAlert icon="i-lucide-cpu" color="neutral" variant="subtle" title="Sin tecnologías" description="No hay tecnologías registradas todavía." />
        </div>

        <template v-else>
        <div v-for="cat in categoryKeys" :key="cat" class="mt-8 first:mt-8">
          <h2 class="text-sm font-semibold text-muted uppercase tracking-wider mb-3">{{ cat }}</h2>
          <div class="space-y-3">
            <div
              v-for="tech in groupedByCategory[cat]"
              :key="tech.id"
              class="rounded-xl bg-bg-elevated border border-border p-5 flex items-center gap-5 transition-all duration-200 hover:shadow-md hover:border-primary/20 hover:-translate-y-0.5"
            >
              <div v-if="tech.icon" class="size-10 rounded-lg bg-bg-accented flex items-center justify-center shrink-0 text-primary">
                <UIcon :name="tech.icon?.startsWith('i-') ? tech.icon : `i-lucide-${tech.icon}`" class="size-5" />
              </div>

              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2">
                  <h3 class="text-sm font-semibold text-highlighted">{{ tech.name }}</h3>
                  <UBadge v-if="tech.showInStack" color="primary" variant="subtle" size="sm">
                    Stack
                  </UBadge>
                  <UBadge v-else color="neutral" variant="subtle" size="sm">
                    Oculta
                  </UBadge>
                </div>
                <p v-if="tech.description" class="text-xs text-muted mt-0.5 truncate">{{ tech.description }}</p>
              </div>

              <div class="flex items-center gap-2 shrink-0">
                <NuxtLink :to="`/admin/technologies/${tech.id}`">
                  <button type="button" class="min-w-11 min-h-11 flex items-center justify-center p-2 rounded-lg text-toned hover:text-primary hover:bg-bg-accented transition-colors">
                    <UIcon name="i-lucide-pencil" class="size-4" />
                  </button>
                </NuxtLink>
                <UButton
                  color="error"
                  variant="ghost"
                  size="lg"
                  icon="i-lucide-trash-2"
                  :loading="deleting === tech.id"
                  :disabled="deleting !== null"
                  @click="confirmDelete(tech.id, tech.name)"
                />
              </div>
            </div>
          </div>
        </div>
      </template>
      </div>
    </template>

    <NuxtPage v-else />
  </div>
</template>
