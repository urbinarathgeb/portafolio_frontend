<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'auth',
  pageTransition: false,
})

const route = useRoute()
const { technologies, fetchById, update, submitting, error, experienceToForm, fetchTechnologies } = useAdminExperiences()
const toast = useToast()
const router = useRouter()

if (route.params.id === 'create') {
  navigateTo('/admin/experiences/create', { replace: true })
}

const experienceId = computed(() => Number(route.params.id))

const form = reactive<ExperienceForm>({
  year: null,
  role: '',
  company: '',
  location: '',
  description: '',
  order: 0,
  techIds: [],
})

const pageLoading = ref(true)
const formErrors = ref<Record<string, string>>({})

const techOptions = computed(() =>
  technologies.value.map(t => ({ label: t.name, value: t.id }))
)

onMounted(async () => {
  const exp = await fetchById(experienceId.value)
  await fetchTechnologies()

  if (exp) {
    const f = experienceToForm(exp)
    Object.assign(form, f)
  } else {
    toast.add({ title: 'Error', description: 'Experiencia no encontrada', color: 'error' })
    router.push('/admin/experiences')
  }

  pageLoading.value = false
})

const handleSubmit = async () => {
  formErrors.value = {}

  if (!form.year) {
    formErrors.value.year = 'El año es requerido'
    return
  }
  if (!form.role.trim()) {
    formErrors.value.role = 'El rol es requerido'
    return
  }
  if (!form.company.trim()) {
    formErrors.value.company = 'La empresa es requerida'
    return
  }
  if (!form.location.trim()) {
    formErrors.value.location = 'La ubicación es requerida'
    return
  }
  if (!form.description.trim()) {
    formErrors.value.description = 'La descripción es requerida'
    return
  }

  const exp = await update(experienceId.value, form)
  if (exp) {
    toast.add({ title: 'Experiencia actualizada', color: 'success' })
    router.push('/admin/experiences')
  } else {
    toast.add({ title: 'Error', description: error.value || 'No se pudo actualizar la experiencia', color: 'error' })
  }
}
</script>

<template>
  <div>
    <UButton
      color="neutral"
      variant="ghost"
      class="mb-6"
      @click="navigateTo('/admin/experiences')"
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
      <h1 class="font-heading text-2xl font-bold text-highlighted mb-8">Editar experiencia</h1>

      <div class="rounded-xl bg-bg-elevated border border-border p-6">
        <form novalidate @submit.prevent="handleSubmit" class="max-w-2xl space-y-6">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <UFormField label="Año" name="year" required>
              <UInput v-model.number="form.year" type="number" placeholder="2024" class="w-full" :disabled="submitting" />
              <p v-if="formErrors.year" class="text-error text-xs mt-1">{{ formErrors.year }}</p>
            </UFormField>

            <UFormField label="Orden" name="order">
              <UInput v-model.number="form.order" type="number" placeholder="0" class="w-full" :disabled="submitting" />
            </UFormField>
          </div>

          <UFormField label="Rol" name="role" required>
            <UInput v-model="form.role" placeholder="Ej: Desarrollador Full Stack" class="w-full" :disabled="submitting" />
            <p v-if="formErrors.role" class="text-error text-xs mt-1">{{ formErrors.role }}</p>
          </UFormField>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <UFormField label="Empresa" name="company" required>
              <UInput v-model="form.company" placeholder="Nombre de la empresa" class="w-full" :disabled="submitting" />
              <p v-if="formErrors.company" class="text-error text-xs mt-1">{{ formErrors.company }}</p>
            </UFormField>

            <UFormField label="Ubicación" name="location" required>
              <UInput v-model="form.location" placeholder="Ej: Remoto / Santiago, Chile" class="w-full" :disabled="submitting" />
              <p v-if="formErrors.location" class="text-error text-xs mt-1">{{ formErrors.location }}</p>
            </UFormField>
          </div>

          <UFormField label="Descripción" name="description" required>
            <UTextarea v-model="form.description" placeholder="Descripción del rol y responsabilidades" class="w-full" :rows="4" :disabled="submitting" />
            <p v-if="formErrors.description" class="text-error text-xs mt-1">{{ formErrors.description }}</p>
          </UFormField>

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

          <div class="flex items-center gap-3 pt-6">
            <UButton type="submit" color="primary" :loading="submitting" :disabled="submitting">
              Guardar cambios
            </UButton>
            <UButton color="neutral" variant="ghost" @click="navigateTo('/admin/experiences')" :disabled="submitting">
              Cancelar
            </UButton>
          </div>
        </form>
      </div>
    </template>
  </div>
</template>
