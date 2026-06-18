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
  githubURLFront: '',
  githubURLBack: '',
  deployURL: '',
  isFeatured: false,
  isFrontend: false,
  isBackend: false,
  caseStudy: { title: '', challenge: '', solution: '', highlights: [], impact: [] },
  techIds: [],
})

const pageLoading = ref(true)
const uploadLoading = ref(false)
const imageInput = ref<HTMLInputElement | null>(null)
const formErrors = ref<Record<string, string>>({})

const addHighlight = () => {
  form.caseStudy!.highlights.push({ title: '', description: '' })
}

const removeHighlight = (index: number) => {
  form.caseStudy!.highlights.splice(index, 1)
}

const addImpact = () => {
  form.caseStudy!.impact.push({ stat: '', subtitle: '', description: '' })
}

const removeImpact = (index: number) => {
  form.caseStudy!.impact.splice(index, 1)
}

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
                <UFormField label="URL GitHub (Frontend)" name="githubURLFront">
                  <UInput v-model="form.githubURLFront" placeholder="https://github.com/..." class="w-full" :disabled="submitting" />
                </UFormField>
                <UFormField label="URL GitHub (Backend)" name="githubURLBack">
                  <UInput v-model="form.githubURLBack" placeholder="https://github.com/..." class="w-full" :disabled="submitting" />
                </UFormField>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
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

              <div class="flex items-center gap-6">
                <UCheckbox v-model="form.isFrontend" label="Frontend" :disabled="submitting" />
                <UCheckbox v-model="form.isBackend" label="Backend" :disabled="submitting" />
              </div>

              <!-- Caso de Estudio -->
              <details class="group border border-border rounded-xl overflow-hidden">
                <summary class="flex items-center justify-between p-4 cursor-pointer text-sm font-semibold text-highlighted hover:bg-bg-muted transition-colors list-none [&::-webkit-details-marker]:hidden">
                  <span class="flex items-center gap-2">
                    <UIcon name="i-lucide-book-open" class="size-4 text-primary" />
                    Caso de Estudio
                  </span>
                  <UIcon name="i-lucide-chevron-down" class="size-4 text-muted transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <div class="border-t border-border p-4 space-y-5">
                  <UFormField label="Título del caso" name="caseStudy.title">
                  <UInput v-model="form.caseStudy!.title" placeholder="CutLog API: Eficiencia Just-in-Time..." class="w-full" :disabled="submitting" />
                </UFormField>

                <UFormField label="Desafío" name="caseStudy.challenge">
                  <UTextarea v-model="form.caseStudy!.challenge" placeholder="Describe el problema o desafío inicial..." class="w-full" :rows="4" :disabled="submitting" />
                </UFormField>

                <UFormField label="Solución" name="caseStudy.solution">
                  <UTextarea v-model="form.caseStudy!.solution" placeholder="Describe la solución implementada..." class="w-full" :rows="4" :disabled="submitting" />
                  </UFormField>

                  <!-- Highlights -->
                  <div>
                    <div class="flex items-center justify-between mb-3">
                      <span class="text-sm font-semibold text-highlighted">Highlights</span>
                      <UButton color="neutral" variant="ghost" size="sm" @click="addHighlight" :disabled="submitting">
                        <template #leading><UIcon name="i-lucide-plus" class="size-3" /></template>
                        Agregar
                      </UButton>
                    </div>
                    <div v-if="form.caseStudy?.highlights?.length" class="space-y-4">
                      <div
                        v-for="(item, i) in form.caseStudy!.highlights"
                        :key="i"
                        class="relative bg-elevated border border-border rounded-xl p-4"
                      >
                        <div class="flex items-center justify-between mb-3">
                          <span class="text-sm font-semibold text-highlighted">Highlight {{ i + 1 }}</span>
                          <UButton color="error" variant="ghost" size="sm" @click="removeHighlight(i)" :disabled="submitting">
                            <UIcon name="i-lucide-x" class="size-4" />
                          </UButton>
                        </div>
                        <div class="space-y-3">
                          <div>
                            <label class="block text-xs font-medium text-muted mb-1">Título</label>
                            <UInput v-model="item.title" placeholder="Ej: Arquitectura Orientada a la Trazabilidad" class="w-full" :disabled="submitting" />
                          </div>
                          <div>
                            <label class="block text-xs font-medium text-muted mb-1">Descripción</label>
                            <UTextarea v-model="item.description" placeholder="Descripción detallada del highlight" class="w-full" :rows="2" :disabled="submitting" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <p v-else class="text-xs text-muted">Sin highlights. Haz clic en "Agregar" para añadir uno.</p>
                  </div>

                  <!-- Impacto -->
                  <div>
                    <div class="flex items-center justify-between mb-3">
                      <span class="text-sm font-semibold text-highlighted">Impacto</span>
                      <UButton color="neutral" variant="ghost" size="sm" @click="addImpact" :disabled="submitting">
                        <template #leading><UIcon name="i-lucide-plus" class="size-3" /></template>
                        Agregar
                      </UButton>
                    </div>
                    <div v-if="form.caseStudy?.impact?.length" class="space-y-4">
                      <div
                        v-for="(item, i) in form.caseStudy!.impact"
                        :key="i"
                        class="relative bg-elevated border border-border rounded-xl p-4"
                      >
                        <div class="flex items-center justify-between mb-3">
                          <span class="text-sm font-semibold text-highlighted">Impacto {{ i + 1 }}</span>
                          <UButton color="error" variant="ghost" size="sm" @click="removeImpact(i)" :disabled="submitting">
                            <UIcon name="i-lucide-x" class="size-4" />
                          </UButton>
                        </div>
                        <div class="space-y-3">
                          <div class="grid grid-cols-2 gap-3">
                            <div>
                              <label class="block text-xs font-medium text-muted mb-1">Valor</label>
                              <UInput v-model="item.stat" placeholder="40%" class="w-full" :disabled="submitting" />
                            </div>
                            <div>
                              <label class="block text-xs font-medium text-muted mb-1">Subtítulo</label>
                              <UInput v-model="item.subtitle" placeholder="Reducción en errores de apilado" class="w-full" :disabled="submitting" />
                            </div>
                          </div>
                          <div>
                            <label class="block text-xs font-medium text-muted mb-1">Descripción</label>
                            <UInput v-model="item.description" placeholder="Al automatizar la sugerencia de configuraciones..." class="w-full" :disabled="submitting" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <p v-else class="text-xs text-muted">Sin métricas de impacto. Haz clic en "Agregar" para añadir una.</p>
                  </div>
                </div>
              </details>

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
