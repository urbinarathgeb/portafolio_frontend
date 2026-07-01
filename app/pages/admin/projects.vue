<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'auth',
  pageTransition: false,
})

const route = useRoute()
const isList = computed(() => route.path === '/admin/projects')

const { projects, loading, error, fetchAll, remove } = useAdminProjects()
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
    toast.add({ title: 'Proyecto eliminado', color: 'success' })
  } else {
    toast.add({ title: 'Error', description: 'No se pudo eliminar el proyecto', color: 'error' })
  }
}
</script>

<template>
  <div>
    <template v-if="isList">
      <div class="flex items-center justify-between mb-1">
        <h1 class="font-heading text-2xl font-bold text-highlighted">Proyectos</h1>
        <UButton color="primary" @click="navigateTo('/admin/projects/create')">
          <template #leading>
            <UIcon name="i-lucide-plus" class="size-4" />
          </template>
          Nuevo proyecto
        </UButton>
      </div>
      <p class="text-muted text-sm">Gestiona los proyectos del portafolio</p>

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

        <div v-else-if="projects.length === 0" class="mt-8">
          <UAlert
            icon="i-lucide-folder-open"
            color="neutral"
            variant="subtle"
            title="Sin proyectos"
            description="No hay proyectos todavía. Crea tu primer proyecto."
          />
        </div>

        <div v-else class="mt-8 space-y-4">
        <div
          v-for="project in projects"
          :key="project.id"
          class="rounded-xl bg-bg-elevated border border-border p-6 flex items-center gap-5 transition-all duration-200 hover:shadow-md hover:border-primary/20 hover:-translate-y-0.5"
        >
          <div class="size-14 rounded-lg bg-bg-accented shrink-0 overflow-hidden">
            <img
              v-if="project.imagePreview"
              :src="project.imagePreview"
              :alt="project.title"
              class="size-full object-cover"
            >
            <div v-else class="size-full flex items-center justify-center text-muted">
              <UIcon name="i-lucide-image" class="size-6" />
            </div>
          </div>

          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2">
              <h3 class="text-sm font-semibold text-highlighted truncate">{{ project.title }}</h3>
              <UBadge v-if="project.isFeatured" color="accent" variant="subtle" size="sm">
                Destacado
              </UBadge>
            </div>
            <p class="text-xs text-muted mt-0.5">{{ project.subtitle }}</p>
            <div class="flex flex-wrap gap-1 mt-1.5">
              <UBadge
                v-for="tech in (project.techStackDetails || [])"
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
            <NuxtLink :to="`/admin/projects/${project.id}`">
              <button type="button" class="min-w-11 min-h-11 flex items-center justify-center p-2 rounded-lg text-toned hover:text-primary hover:bg-bg-accented transition-colors">
                <UIcon name="i-lucide-pencil" class="size-4" />
              </button>
            </NuxtLink>
            <UButton
              color="error"
              variant="ghost"
              size="lg"
              icon="i-lucide-trash-2"
              :loading="deleting === project.id"
              :disabled="deleting !== null"
              @click="confirmDelete(project.id, project.title)"
            />
          </div>
        </div>
      </div>
      </div>
    </template>

    <NuxtPage v-else />
  </div>
</template>
