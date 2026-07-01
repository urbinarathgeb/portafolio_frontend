<script setup lang="ts">
definePageMeta({
  layout: false,
  pageTransition: false,
})

const { login, loading, error } = useAuth()
const toast = useToast()
const router = useRouter()

const credentials = reactive({
  email: '',
  password: '',
})

const formErrors = ref<Record<string, string>>({})
const showPassword = ref(false)

const handleSubmit = async () => {
  formErrors.value = {}

  if (!credentials.email.trim()) {
    formErrors.value.email = 'El email es requerido'
    return
  }
  if (!credentials.password.trim()) {
    formErrors.value.password = 'La contraseña es requerida'
    return
  }

  const success = await login({
    email: credentials.email.trim(),
    password: credentials.password,
  })

  if (success) {
    toast.add({ title: 'Bienvenido', description: 'Inicio de sesión exitoso', color: 'success' })
    router.push('/admin')
  } else {
    toast.add({ title: 'Error', description: error.value || 'Credenciales inválidas', color: 'error' })
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-default p-4">
    <div class="w-full max-w-sm">
      <div class="text-center mb-8">
        <h1 class="font-heading text-2xl font-bold text-highlighted">Admin</h1>
        <p class="text-muted text-sm mt-1">Panel de administración del portafolio</p>
      </div>

      <UCard>
        <form novalidate @submit.prevent="handleSubmit">
          <div class="space-y-4">
            <UFormField label="Email" name="email" required>
              <UInput
                v-model="credentials.email"
                type="email"
                placeholder="admin@mail.com"
                autocomplete="email"
                class="w-full"
                :disabled="loading"
              />
              <p v-if="formErrors.email" class="text-error text-xs mt-1">{{ formErrors.email }}</p>
            </UFormField>

            <UFormField label="Contraseña" name="password" required>
              <UInput
                v-model="credentials.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••"
                autocomplete="current-password"
                class="w-full"
                :disabled="loading"
              >
                <template #trailing>
                  <UButton
                    color="neutral"
                    variant="ghost"
                    size="lg"
                    class="min-w-11"
                    :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                    @click="showPassword = !showPassword"
                    :disabled="loading"
                  />
                </template>
              </UInput>
              <p v-if="formErrors.password" class="text-error text-xs mt-1">{{ formErrors.password }}</p>
            </UFormField>
          </div>

          <UButton
            type="submit"
            color="primary"
            class="w-full mt-6"
            :loading="loading"
            :disabled="loading"
          >
            Iniciar sesión
          </UButton>
        </form>
      </UCard>
    </div>
  </div>
</template>
