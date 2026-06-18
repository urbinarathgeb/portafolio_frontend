<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'auth',
  pageTransition: false,
})

const route = useRoute()
const { fetchById, update, submitting, error, technologyToForm, categories } = useAdminTechnologies()
const toast = useToast()
const router = useRouter()

if (route.params.id === 'create') {
  navigateTo('/admin/technologies/create', { replace: true })
}

const techId = computed(() => Number(route.params.id))

const form = reactive<TechnologyForm>({
  name: '',
  category: '',
  description: '',
  icon: '',
  span: null,
  order: null,
  showInStack: false,
})

const pageLoading = ref(true)
const formErrors = ref<Record<string, string>>({})
const showCustomCategory = ref(false)

const categoryOptions = computed(() => [
  ...categories.value.map(c => ({ label: c, value: c })),
  { label: '✚ Otra categoría...', value: '__custom__' },
])

const handleCategoryChange = (val: string) => {
  if (val === '__custom__') {
    showCustomCategory.value = true
    form.category = ''
  } else {
    showCustomCategory.value = false
    form.category = val
  }
}

// Si la categoría actual no está en el dropdown, mostrar el input custom
watchEffect(() => {
  if (form.category && !categories.value.includes(form.category)) {
    showCustomCategory.value = true
  }
})

onMounted(async () => {
  const tech = await fetchById(techId.value)
  if (tech) {
    const f = technologyToForm(tech)
    Object.assign(form, f)
  } else {
    toast.add({ title: 'Error', description: 'Tecnología no encontrada', color: 'error' })
    router.push('/admin/technologies')
  }
  pageLoading.value = false
})

const handleSubmit = async () => {
  formErrors.value = {}

  if (!form.name.trim()) {
    formErrors.value.name = 'El nombre es requerido'
    return
  }
  if (!form.category.trim()) {
    formErrors.value.category = 'La categoría es requerida'
    return
  }

  const tech = await update(techId.value, form)
  if (tech) {
    toast.add({ title: 'Tecnología actualizada', color: 'success' })
    router.push('/admin/technologies')
  } else {
    toast.add({ title: 'Error', description: error.value || 'No se pudo actualizar la tecnología', color: 'error' })
  }
}
</script>

<template>
  <div>
    <UButton color="neutral" variant="ghost" class="mb-6" @click="navigateTo('/admin/technologies')">
      <template #leading><UIcon name="i-lucide-arrow-left" class="size-4" /></template>
      Volver
    </UButton>

    <div v-if="pageLoading" class="space-y-6">
      <div v-for="i in 4" :key="i" class="h-12 rounded-xl bg-bg-elevated animate-pulse" />
    </div>

    <template v-else>
      <h1 class="font-heading text-2xl font-bold text-highlighted mb-8">Editar tecnología</h1>

      <div class="rounded-xl bg-bg-elevated border border-border p-6">
        <form novalidate @submit.prevent="handleSubmit" class="max-w-2xl space-y-6">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <UFormField label="Nombre" name="name" required>
              <UInput v-model="form.name" placeholder="Ej: Vue.js" class="w-full" :disabled="submitting" />
              <p v-if="formErrors.name" class="text-error text-xs mt-1">{{ formErrors.name }}</p>
            </UFormField>

            <UFormField label="Categoría" name="category" required>
              <USelectMenu
                v-model="form.category"
                :items="categoryOptions"
                placeholder="Seleccionar categoría"
                class="w-full"
                :disabled="submitting"
                @update:model-value="handleCategoryChange"
              />
              <UInput
                v-if="showCustomCategory"
                v-model="form.category"
                placeholder="Nombre de la nueva categoría"
                class="w-full mt-2"
                :disabled="submitting"
                autofocus
              />
              <p v-if="formErrors.category" class="text-error text-xs mt-1">{{ formErrors.category }}</p>
            </UFormField>
          </div>

          <UFormField label="Descripción" name="description">
            <UInput v-model="form.description" placeholder="Breve descripción" class="w-full" :disabled="submitting" />
          </UFormField>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <UFormField label="Icono (Lucide)" name="icon">
              <UInput v-model="form.icon" placeholder="Ej: i-lucide-vue" class="w-full" :disabled="submitting" />
            </UFormField>

          <UFormField label="Span (grid)" name="span">
            <UInput v-model.number="form.span" type="number" min="1" placeholder="Ej: 2" class="w-full" :disabled="submitting" />
          </UFormField>

          <UFormField label="Orden" name="order">
            <UInput v-model.number="form.order" type="number" min="0" placeholder="Ej: 0" class="w-full" :disabled="submitting" />
          </UFormField>
          </div>

          <UCheckbox v-model="form.showInStack" label="Mostrar en el stack público" :disabled="submitting" />

          <div class="flex items-center gap-3 pt-6">
            <UButton type="submit" color="primary" :loading="submitting" :disabled="submitting">
              Guardar cambios
            </UButton>
            <UButton color="neutral" variant="ghost" @click="navigateTo('/admin/technologies')" :disabled="submitting">
              Cancelar
            </UButton>
          </div>
        </form>
      </div>
    </template>
  </div>
</template>
