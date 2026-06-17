<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'auth',
  pageTransition: false,
})

const route = useRoute()
const { fetchById, update, submitting, error, serviceToForm } = useAdminServices()
const toast = useToast()
const router = useRouter()

if (route.params.id === 'create') {
  navigateTo('/admin/services/create', { replace: true })
}

const serviceId = computed(() => Number(route.params.id))

const form = reactive<ServiceForm>({ title: '', description: '', icon: '' })
const pageLoading = ref(true)
const formErrors = ref<Record<string, string>>({})

onMounted(async () => {
  const svc = await fetchById(serviceId.value)
  if (svc) {
    Object.assign(form, serviceToForm(svc))
  } else {
    toast.add({ title: 'Error', description: 'Servicio no encontrado', color: 'error' })
    router.push('/admin/services')
  }
  pageLoading.value = false
})

const handleSubmit = async () => {
  formErrors.value = {}

  if (!form.title.trim()) {
    formErrors.value.title = 'El título es requerido'
    return
  }
  if (!form.description.trim()) {
    formErrors.value.description = 'La descripción es requerida'
    return
  }

  const svc = await update(serviceId.value, form)
  if (svc) {
    toast.add({ title: 'Servicio actualizado', color: 'success' })
    router.push('/admin/services')
  } else {
    toast.add({ title: 'Error', description: error.value || 'No se pudo actualizar el servicio', color: 'error' })
  }
}
</script>

<template>
  <div>
    <UButton color="neutral" variant="ghost" class="mb-6" @click="navigateTo('/admin/services')">
      <template #leading><UIcon name="i-lucide-arrow-left" class="size-4" /></template>
      Volver
    </UButton>

    <div v-if="pageLoading" class="space-y-6">
      <div v-for="i in 3" :key="i" class="h-12 rounded-xl bg-bg-elevated animate-pulse" />
    </div>

    <template v-else>
      <h1 class="font-heading text-2xl font-bold text-highlighted mb-8">Editar servicio</h1>

      <div class="rounded-xl bg-bg-elevated border border-border p-6">
        <form novalidate @submit.prevent="handleSubmit" class="max-w-2xl space-y-6">
          <UFormField label="Título" name="title" required>
            <UInput v-model="form.title" placeholder="Ej: Desarrollo Web" class="w-full" :disabled="submitting" />
            <p v-if="formErrors.title" class="text-error text-xs mt-1">{{ formErrors.title }}</p>
          </UFormField>

          <UFormField label="Descripción" name="description" required>
            <UTextarea v-model="form.description" placeholder="Descripción del servicio" class="w-full" :rows="4" :disabled="submitting" />
            <p v-if="formErrors.description" class="text-error text-xs mt-1">{{ formErrors.description }}</p>
          </UFormField>

          <UFormField label="Icono (Lucide)" name="icon">
            <UInput v-model="form.icon" placeholder="Ej: i-lucide-code-2" class="w-full" :disabled="submitting" />
          </UFormField>

          <div class="flex items-center gap-3 pt-6">
            <UButton type="submit" color="primary" :loading="submitting" :disabled="submitting">Guardar cambios</UButton>
            <UButton color="neutral" variant="ghost" @click="navigateTo('/admin/services')" :disabled="submitting">Cancelar</UButton>
          </div>
        </form>
      </div>
    </template>
  </div>
</template>
