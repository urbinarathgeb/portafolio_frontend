<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'auth',
  pageTransition: false,
})

const { getEmptyForm, create, fetchTechnologies, technologies, submitting, error } = useAdminProjects()
const toast = useToast()
const router = useRouter()

const form = reactive<ProjectForm>(getEmptyForm())

const techOptions = computed(() =>
  technologies.value.map(t => ({ label: t.name, value: t.id }))
)

onMounted(() => {
  fetchTechnologies()
})

const formErrors = ref<Record<string, string>>({})

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

  const project = await create(form)
  if (project) {
    toast.add({ title: 'Proyecto creado', color: 'success' })
    router.push('/admin/projects')
  } else {
    toast.add({ title: 'Error', description: error.value || 'No se pudo crear el proyecto', color: 'error' })
  }
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

    <h1 class="font-heading text-2xl font-bold text-highlighted mb-8">Nuevo proyecto</h1>

    <div class="rounded-xl bg-bg-elevated border border-border p-6">

    <form novalidate @submit.prevent="handleSubmit" class="max-w-2xl space-y-6">
      <UFormField label="Título" name="title" required>
        <UInput v-model="form.title" placeholder="Nombre del proyecto" class="w-full" :disabled="submitting" />
        <p v-if="formErrors.title" class="text-error text-xs mt-1">{{ formErrors.title }}</p>
      </UFormField>

      <UFormField label="Subtítulo" name="subtitle" required>
        <UInput v-model="form.subtitle" placeholder="Breve descripción del proyecto" class="w-full" :disabled="submitting" />
        <p v-if="formErrors.subtitle" class="text-error text-xs mt-1">{{ formErrors.subtitle }}</p>
      </UFormField>

      <UFormField label="Descripción" name="description" required>
        <UTextarea v-model="form.description" placeholder="Descripción detallada del proyecto" class="w-full" :rows="5" :disabled="submitting" />
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
          Crear proyecto
        </UButton>
        <UButton color="neutral" variant="ghost" @click="navigateTo('/admin/projects')" :disabled="submitting">
          Cancelar
        </UButton>
      </div>
    </form>
    </div>
  </div>
</template>
