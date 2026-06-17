<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'auth',
  pageTransition: false,
})

const route = useRoute()
const isList = computed(() => route.path === '/admin/services')

const { services, loading, error, fetchAll, remove } = useAdminServices()
const toast = useToast()
const deleting = ref<number | null>(null)

onMounted(() => {
  fetchAll()
})

const confirmDelete = async (id: number, title: string) => {
  if (!confirm(`¿Eliminar "${title}"? Esta acción no se puede deshacer.`)) return
  deleting.value = id
  const success = await remove(id)
  deleting.value = null
  if (success) {
    toast.add({ title: 'Servicio eliminado', color: 'success' })
  } else {
    toast.add({ title: 'Error', description: 'No se pudo eliminar el servicio', color: 'error' })
  }
}
</script>

<template>
  <div>
    <template v-if="isList">
      <div class="flex items-center justify-between mb-1">
        <h1 class="font-heading text-2xl font-bold text-highlighted">Servicios</h1>
        <UButton color="primary" @click="navigateTo('/admin/services/create')">
          <template #leading><UIcon name="i-lucide-plus" class="size-4" /></template>
          Nuevo servicio
        </UButton>
      </div>
      <p class="text-muted text-sm">Gestiona los servicios ofrecidos</p>

      <div role="status" aria-live="polite" aria-atomic="true">
        <div v-if="loading" class="mt-8 space-y-3">
          <div v-for="i in 3" :key="i" class="h-24 rounded-xl bg-bg-elevated animate-pulse" />
        </div>

        <UAlert v-else-if="error" color="error" variant="subtle" title="Error" :description="error" class="mt-8" />

        <div v-else-if="services.length === 0" class="mt-8">
          <UAlert icon="i-lucide-concierge-bell" color="neutral" variant="subtle" title="Sin servicios" description="No hay servicios registrados todavía." />
        </div>

        <div v-else class="mt-8 space-y-4">
        <div
          v-for="svc in services"
          :key="svc.id"
          class="rounded-xl bg-bg-elevated border border-border p-6 flex items-center gap-5 transition-all duration-200 hover:shadow-md hover:border-primary/20 hover:-translate-y-0.5"
        >
          <div v-if="svc.icon" class="size-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 text-primary">
            <UIcon :name="svc.icon.startsWith('i-') ? svc.icon : `i-lucide-${svc.icon}`" class="size-6" />
          </div>

          <div class="flex-1 min-w-0">
            <h3 class="text-sm font-semibold text-highlighted">{{ svc.title }}</h3>
            <p class="text-sm text-toned mt-0.5 line-clamp-2">{{ svc.description }}</p>
          </div>

          <div class="flex items-center gap-2 shrink-0">
            <NuxtLink :to="`/admin/services/${svc.id}`">
              <button type="button" class="p-2 rounded-lg text-toned hover:text-primary hover:bg-bg-accented transition-colors">
                <UIcon name="i-lucide-pencil" class="size-4" />
              </button>
            </NuxtLink>
            <UButton
              color="error" variant="ghost" icon="i-lucide-trash-2"
              :loading="deleting === svc.id" :disabled="deleting !== null"
              @click="confirmDelete(svc.id, svc.title)"
            />
          </div>
        </div>
      </div>
      </div>
    </template>

    <NuxtPage v-else />
  </div>
</template>
