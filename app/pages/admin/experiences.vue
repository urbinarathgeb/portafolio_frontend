<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'auth',
  pageTransition: false,
})

const route = useRoute()
const isList = computed(() => route.path === '/admin/experiences')

const { experiences, loading, error, fetchAll, remove } = useAdminExperiences()
const toast = useToast()
const deleting = ref<number | null>(null)

onMounted(() => {
  fetchAll()
})

const confirmDelete = async (id: number, role: string) => {
  if (!confirm(`¿Eliminar experiencia "${role}"? Esta acción no se puede deshacer.`)) return
  deleting.value = id
  const success = await remove(id)
  deleting.value = null
  if (success) {
    toast.add({ title: 'Experiencia eliminada', color: 'success' })
  } else {
    toast.add({ title: 'Error', description: 'No se pudo eliminar la experiencia', color: 'error' })
  }
}
</script>

<template>
  <div>
    <template v-if="isList">
      <div class="flex items-center justify-between mb-1">
        <h1 class="font-heading text-2xl font-bold text-highlighted">Experiencia</h1>
        <UButton color="primary" @click="navigateTo('/admin/experiences/create')">
          <template #leading>
            <UIcon name="i-lucide-plus" class="size-4" />
          </template>
          Nueva experiencia
        </UButton>
      </div>
      <p class="text-muted text-sm">Gestiona la línea de tiempo profesional</p>

      <div role="status" aria-live="polite" aria-atomic="true">
        <div v-if="loading" class="mt-8 space-y-3">
          <div v-for="i in 4" :key="i" class="h-24 rounded-xl bg-bg-elevated animate-pulse" />
        </div>

        <UAlert
          v-else-if="error"
          color="error"
          variant="subtle"
          title="Error"
          :description="error"
          class="mt-8"
        />

        <div v-else-if="experiences.length === 0" class="mt-8">
          <UAlert
            icon="i-lucide-briefcase"
            color="neutral"
            variant="subtle"
            title="Sin experiencias"
            description="No hay experiencias registradas todavía."
          />
        </div>

        <div v-else class="mt-8 space-y-4">
        <div
          v-for="exp in experiences"
          :key="exp.id"
          class="rounded-xl bg-bg-elevated border border-border p-6 flex items-center gap-5 transition-all duration-200 hover:shadow-md hover:border-primary/20 hover:-translate-y-0.5"
        >
          <div class="flex items-center gap-3 shrink-0">
            <span class="font-heading text-2xl font-bold text-primary">{{ exp.year }}</span>
          </div>

          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2">
              <h3 class="text-sm font-semibold text-highlighted truncate">{{ exp.role }}</h3>
              <span class="text-xs text-muted">·</span>
              <span class="text-xs text-primary font-medium">{{ exp.company }}</span>
            </div>
            <p class="text-xs text-muted mt-0.5">{{ exp.location }}</p>
            <p class="text-sm text-toned mt-1.5 line-clamp-2">{{ exp.description }}</p>
            <div class="flex flex-wrap gap-1 mt-1.5">
              <UBadge
                v-for="tech in (exp.technologies || [])"
                :key="tech.id"
                color="neutral"
                variant="subtle"
                size="sm"
              >
                {{ tech.name }}
              </UBadge>
            </div>
          </div>

          <div class="flex items-center gap-2 shrink-0">
            <NuxtLink :to="`/admin/experiences/${exp.id}`">
              <button type="button" class="p-2 rounded-lg text-toned hover:text-primary hover:bg-bg-accented transition-colors">
                <UIcon name="i-lucide-pencil" class="size-4" />
              </button>
            </NuxtLink>
            <UButton
              color="error"
              variant="ghost"
              icon="i-lucide-trash-2"
              :loading="deleting === exp.id"
              :disabled="deleting !== null"
              @click="confirmDelete(exp.id, exp.role)"
            />
          </div>
        </div>
      </div>
      </div>
    </template>

    <NuxtPage v-else />
  </div>
</template>
