<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'auth',
  pageTransition: false,
})

const { loading, error, groupedByProject, fetchAll, setPreview, formatBytes, toggling } = useAdminImages()
const toast = useToast()

onMounted(() => { fetchAll() })

const handlePreviewToggle = async (img: AdminProjectImage) => {
  const success = await setPreview(img.id, !img.isPreview)
  if (success) {
    toast.add({
      title: img.isPreview ? 'Preview eliminado' : 'Preview actualizado',
      color: 'success',
    })
  } else {
    toast.add({ title: 'Error', description: 'No se pudo actualizar el preview', color: 'error' })
  }
}
</script>

<template>
  <div>
    <h1 class="font-heading text-2xl font-bold text-highlighted mb-1">Imágenes</h1>
    <p class="text-muted text-sm mb-8">Todas las imágenes subidas a proyectos</p>

    <div role="status" aria-live="polite" aria-atomic="true">
      <div v-if="loading" class="space-y-8">
        <div v-for="i in 3" :key="i" class="space-y-4">
          <div class="h-5 w-40 rounded bg-bg-elevated animate-pulse" />
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <div v-for="j in 4" :key="j" class="aspect-video rounded-xl bg-bg-elevated animate-pulse" />
          </div>
        </div>
      </div>

      <UAlert v-else-if="error" color="error" variant="subtle" title="Error" :description="error" />

      <div v-else-if="groupedByProject.length === 0">
        <UAlert icon="i-lucide-image-off" color="neutral" variant="subtle" title="Sin imágenes" description="No hay imágenes subidas todavía." />
      </div>

      <template v-else>
        <div v-for="group in groupedByProject" :key="group.projectId" class="mb-12 last:mb-0">
          <NuxtLink
            :to="`/admin/projects/${group.projectId}`"
            class="inline-flex items-center gap-2 text-sm font-semibold text-highlighted hover:text-primary transition-colors mb-4 group"
          >
            <UIcon name="i-lucide-folder" class="size-4" />
            {{ group.projectTitle }}
            <UIcon name="i-lucide-arrow-up-right" class="size-3 text-muted group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </NuxtLink>

          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            <div
              v-for="img in group.images"
              :key="img.id"
              class="group relative rounded-xl bg-bg-elevated border overflow-hidden transition-all duration-200 hover:shadow-md hover:border-primary/20 hover:-translate-y-0.5"
              :class="[img.isPreview ? 'border-primary' : 'border-border']"
            >
              <a :href="img.url" target="_blank" rel="noopener noreferrer" class="block">
                <img
                  :src="img.url"
                  :alt="img.originalName"
                  class="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                >
              </a>

              <div v-if="img.isPreview" class="absolute top-2 left-2">
                <UBadge color="primary" variant="solid" size="sm">
                  <template #leading>
                    <UIcon name="i-lucide-star" class="size-3" />
                  </template>
                  Preview
                </UBadge>
              </div>

              <div class="p-4">
                <p class="text-xs font-medium text-highlighted truncate" :title="img.originalName">
                  {{ img.originalName }}
                </p>
                <div class="flex items-center gap-2 mt-1 text-xs text-muted">
                  <span>{{ img.format?.toUpperCase() }}</span>
                  <span>·</span>
                  <span>{{ formatBytes(img.bytes) }}</span>
                </div>

                <button
                  type="button"
                  class="mt-3 inline-flex items-center gap-1.5 text-xs font-medium transition-colors"
                  :class="[img.isPreview ? 'text-warning hover:text-warning/80' : 'text-muted hover:text-primary']"
                  :disabled="toggling === img.id"
                  @click="handlePreviewToggle(img)"
                >
                  <UIcon
                    :name="img.isPreview ? 'i-lucide-star-off' : 'i-lucide-star'"
                    class="size-3.5"
                    :class="{ 'animate-pulse': toggling === img.id }"
                  />
                  {{ img.isPreview ? 'Quitar preview' : 'Establecer como preview' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>