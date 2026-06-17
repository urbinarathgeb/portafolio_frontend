<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'auth',
  pageTransition: false,
})

const route = useRoute()
const { technologies, fetchById, update, submitting, error, projectToForm, fetchTechnologies, uploadImage } = useAdminProjects()
const toast = useToast()
const router = useRouter()

if (route.params.id === 'create') {
  navigateTo('/admin/projects/create', { replace: true })
}

const projectId = computed(() => Number(route.params.id))

const form = reactive<ProjectForm>({
  title: '',
  subtitle: '',
  description: '',
  githubURL: '',
  deployURL: '',
  isFeatured: false,
  techIds: [],
})

const pageLoading = ref(true)
const uploadLoading = ref(false)
const imageInput = ref<HTMLInputElement | null>(null)
const formErrors = ref<Record<string, string>>({})

const techOptions = computed(() =>
  technologies.value.map(t => ({ label: t.name, value: t.id }))
)

onMounted(async () => {
  const project = await fetchById(projectId.value)
  await fetchTechnologies()

  if (project) {
    const f = projectToForm(project)
    Object.assign(form, f)
  } else {
    toast.add({ title: 'Error', description: 'Proyecto no encontrado', color: 'error' })
    router.push('/admin/projects')
  }

  pageLoading.value = false
})

const handleSubmit = async () => {
  formErrors.value = {}

  if (!form.title.trim()) {
    formErrors.value.title = 'El título es requerido'
    return
  }
  if (!form.subtitle.trim()) {
    formErrors.value.subtitle = 'El subtítulo es requerido'
    return
  }
  if (!form.description.trim()) {
    formErrors.value.description = 'La descripción es requerida'
    return
  }

  const project = await update(projectId.value, form)
  if (project) {
    toast.add({ title: 'Proyecto actualizado', color: 'success' })
    router.push('/admin/projects')
  } else {
    toast.add({ title: 'Error', description: error.value || 'No se pudo actualizar el proyecto', color: 'error' })
  }
}

const handleImageUpload = async (event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return

  uploadLoading.value = true
  const success = await uploadImage(projectId.value, file)
  uploadLoading.value = false

  if (success) {
    toast.add({ title: 'Imagen subida', color: 'success' })
    // Refresh project data to show new image
    const project = await fetchById(projectId.value)
    if (project) {
      const f = projectToForm(project)
      Object.assign(form, f)
    }
  } else {
    toast.add({ title: 'Error', description: 'No se pudo subir la imagen', color: 'error' })
  }

  input.value = ''
}
</script>

<template>
  <div>
    <UButton
      color="neutral"
      variant="ghost"
      class="mb-6"
      @click="navigateTo('/admin/projects')"
    >
      <template #leading>
        <UIcon name="i-lucide-arrow-left" class="size-4" />
      </template>
      Volver
    </UButton>

    <div v-if="pageLoading" class="space-y-6">
      <div v-for="i in 5" :key="i" class="h-12 rounded-xl bg-bg-elevated animate-pulse" />
    </div>

    <template v-else>
      <h1 class="font-heading text-2xl font-bold text-highlighted mb-8">Editar proyecto</h1>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Form -->
        <div class="lg:col-span-2">
          <div class="rounded-xl bg-bg-elevated border border-border p-6">
            <form novalidate @submit.prevent="handleSubmit" class="space-y-6">
              <UFormField label="Título" name="title" required>
                <UInput v-model="form.title" placeholder="Nombre del proyecto" class="w-full" :disabled="submitting" />
                <p v-if="formErrors.title" class="text-error text-xs mt-1">{{ formErrors.title }}</p>
              </UFormField>

              <UFormField label="Subtítulo" name="subtitle" required>
                <UInput v-model="form.subtitle" placeholder="Breve descripción" class="w-full" :disabled="submitting" />
                <p v-if="formErrors.subtitle" class="text-error text-xs mt-1">{{ formErrors.subtitle }}</p>
              </UFormField>

              <UFormField label="Descripción" name="description" required>
                <UTextarea v-model="form.description" placeholder="Descripción detallada" class="w-full" :rows="5" :disabled="submitting" />
                <p v-if="formErrors.description" class="text-error text-xs mt-1">{{ formErrors.description }}</p>
              </UFormField>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <UFormField label="URL de GitHub" name="githubURL">
                  <UInput v-model="form.githubURL" placeholder="https://github.com/..." class="w-full" :disabled="submitting" />
                </UFormField>
                <UFormField label="URL de Deploy" name="deployURL">
                  <UInput v-model="form.deployURL" placeholder="https://..." class="w-full" :disabled="submitting" />
                </UFormField>
              </div>

              <UFormField label="Tecnologías" name="techIds">
                <USelectMenu
                  v-model="form.techIds"
                  :items="techOptions"
                  value-key="value"
                  multiple
                  placeholder="Seleccionar tecnologías"
                  class="w-full"
                  :disabled="submitting"
                />
              </UFormField>

              <UCheckbox v-model="form.isFeatured" label="Proyecto destacado" :disabled="submitting" />

              <div class="flex items-center gap-3 pt-6">
                <UButton type="submit" color="primary" :loading="submitting" :disabled="submitting">
                  Guardar cambios
                </UButton>
                <UButton color="neutral" variant="ghost" @click="navigateTo('/admin/projects')" :disabled="submitting">
                  Cancelar
                </UButton>
              </div>
            </form>
          </div>
        </div>

        <!-- Image upload sidebar -->
        <div>
          <div class="rounded-xl bg-bg-elevated border border-border p-6 sticky top-8">
            <h2 class="text-sm font-semibold text-highlighted mb-4">Imágenes</h2>

            <UButton
              color="neutral"
              variant="outline"
              class="w-full"
              :loading="uploadLoading"
              :disabled="uploadLoading"
              @click="imageInput?.click()"
            >
              <template #leading>
                <UIcon name="i-lucide-upload" class="size-4" />
              </template>
              Subir imagen
            </UButton>

            <input
              ref="imageInput"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              class="hidden"
              @change="handleImageUpload"
            >

            <p class="text-xs text-muted mt-2">
              JPEG, PNG o WebP. Máximo 2MB.
            </p>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
