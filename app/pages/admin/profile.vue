<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'auth',
  pageTransition: false,
})

const { profile, loading, profileSubmitting, passwordSubmitting, error, fetchProfile, updateProfile, changePassword, profileToForm } = useAdminProfile()
const toast = useToast()

const profileForm = reactive<ProfileForm>({
  name: '', lastname: '', email: '', title: '', tagline: '',
  heroDescription: '', bio: '', availability: false, location: '', avatar: '',
})

const passwordForm = reactive<PasswordForm>({
  currentPassword: '', newPassword: '', confirmPassword: '',
})

onMounted(async () => {
  await fetchProfile()
  if (profile.value) {
    Object.assign(profileForm, profileToForm(profile.value))
  }
})

const profileErrors = ref<Record<string, string>>({})

const handleProfileSubmit = async () => {
  profileErrors.value = {}

  if (!profileForm.name.trim()) {
    profileErrors.value.name = 'El nombre es requerido'
    return
  }
  if (!profileForm.lastname.trim()) {
    profileErrors.value.lastname = 'El apellido es requerido'
    return
  }
  if (!profileForm.email.trim()) {
    profileErrors.value.email = 'El email es requerido'
    return
  }

  const success = await updateProfile(profileForm)
  if (success) {
    toast.add({ title: 'Perfil actualizado', color: 'success' })
  } else {
    toast.add({ title: 'Error', description: error.value || 'No se pudo actualizar el perfil', color: 'error' })
  }
}

const passwordErrors = ref<Record<string, string>>({})

const handlePasswordSubmit = async () => {
  passwordErrors.value = {}

  if (!passwordForm.currentPassword) {
    passwordErrors.value.currentPassword = 'La contraseña actual es requerida'
    return
  }
  if (!passwordForm.newPassword) {
    passwordErrors.value.newPassword = 'La nueva contraseña es requerida'
    return
  }
  if (passwordForm.newPassword.length < 8) {
    passwordErrors.value.newPassword = 'La nueva contraseña debe tener al menos 8 caracteres'
    return
  }
  if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    passwordErrors.value.confirmPassword = 'Las contraseñas no coinciden'
    return
  }

  const success = await changePassword(passwordForm.currentPassword, passwordForm.newPassword)
  if (success) {
    toast.add({ title: 'Contraseña actualizada', color: 'success' })
    passwordForm.currentPassword = ''
    passwordForm.newPassword = ''
    passwordForm.confirmPassword = ''
  } else {
    toast.add({ title: 'Error', description: error.value || 'No se pudo cambiar la contraseña', color: 'error' })
  }
}
</script>

<template>
  <div>
    <h1 class="font-heading text-2xl font-bold text-highlighted mb-1">Perfil</h1>
    <p class="text-muted text-sm mb-8">Gestiona tu información personal y profesional</p>

    <div v-if="loading" class="space-y-6">
      <div v-for="i in 6" :key="i" class="h-12 rounded-xl bg-bg-elevated animate-pulse" />
    </div>

    <template v-else>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Profile form -->
        <div class="rounded-xl bg-bg-elevated border border-border p-6">
          <h2 class="text-sm font-semibold text-muted uppercase tracking-wider mb-6">Información personal</h2>

          <form novalidate @submit.prevent="handleProfileSubmit" class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <UFormField label="Nombre" name="name" required>
                <UInput v-model="profileForm.name" class="w-full" :disabled="profileSubmitting" />
                <p v-if="profileErrors.name" class="text-error text-xs mt-1">{{ profileErrors.name }}</p>
              </UFormField>
              <UFormField label="Apellido" name="lastname" required>
                <UInput v-model="profileForm.lastname" class="w-full" :disabled="profileSubmitting" />
                <p v-if="profileErrors.lastname" class="text-error text-xs mt-1">{{ profileErrors.lastname }}</p>
              </UFormField>
            </div>

            <UFormField label="Email" name="email" required>
              <UInput v-model="profileForm.email" type="email" class="w-full" :disabled="profileSubmitting" />
              <p v-if="profileErrors.email" class="text-error text-xs mt-1">{{ profileErrors.email }}</p>
            </UFormField>

            <UFormField label="Título profesional" name="title">
              <UInput v-model="profileForm.title" placeholder="Ej: Full Stack Developer" class="w-full" :disabled="profileSubmitting" />
            </UFormField>

            <UFormField label="Tagline" name="tagline">
              <UInput v-model="profileForm.tagline" placeholder="Frase corta que te describe" class="w-full" :disabled="profileSubmitting" />
            </UFormField>

            <UFormField label="Descripción del Hero" name="heroDescription">
              <UTextarea v-model="profileForm.heroDescription" placeholder="Texto que aparece en la página principal" class="w-full" :rows="3" :disabled="profileSubmitting" />
            </UFormField>

            <UFormField label="Biografía" name="bio">
              <UTextarea v-model="profileForm.bio" placeholder="Biografía detallada para la sección Sobre Mí" class="w-full" :rows="5" :disabled="profileSubmitting" />
            </UFormField>

            <div class="grid grid-cols-2 gap-4">
              <UFormField label="Ubicación" name="location">
                <UInput v-model="profileForm.location" placeholder="Ej: Santiago, Chile" class="w-full" :disabled="profileSubmitting" />
              </UFormField>
              <UFormField label="Avatar (URL)" name="avatar">
                <UInput v-model="profileForm.avatar" placeholder="https://..." class="w-full" :disabled="profileSubmitting" />
              </UFormField>
            </div>

            <UCheckbox v-model="profileForm.availability" label="Disponible para trabajar" :disabled="profileSubmitting" />

            <div class="pt-4">
              <UButton type="submit" color="primary" :loading="profileSubmitting" :disabled="profileSubmitting">
                Guardar cambios
              </UButton>
            </div>
          </form>
        </div>

        <!-- Password form -->
        <div class="rounded-xl bg-bg-elevated border border-border p-6">
          <h2 class="text-sm font-semibold text-muted uppercase tracking-wider mb-6">Cambiar contraseña</h2>

          <form novalidate @submit.prevent="handlePasswordSubmit" class="space-y-4">
            <UFormField label="Contraseña actual" name="currentPassword" required>
              <UInput v-model="passwordForm.currentPassword" type="password" class="w-full" :disabled="passwordSubmitting" />
              <p v-if="passwordErrors.currentPassword" class="text-error text-xs mt-1">{{ passwordErrors.currentPassword }}</p>
            </UFormField>

            <UFormField label="Nueva contraseña" name="newPassword" required>
              <UInput v-model="passwordForm.newPassword" type="password" class="w-full" :disabled="passwordSubmitting" />
              <p v-if="passwordErrors.newPassword" class="text-error text-xs mt-1">{{ passwordErrors.newPassword }}</p>
            </UFormField>

            <UFormField label="Confirmar nueva contraseña" name="confirmPassword" required>
              <UInput v-model="passwordForm.confirmPassword" type="password" class="w-full" :disabled="passwordSubmitting" />
              <p v-if="passwordErrors.confirmPassword" class="text-error text-xs mt-1">{{ passwordErrors.confirmPassword }}</p>
            </UFormField>

            <div class="pt-4">
              <UButton type="submit" color="primary" :loading="passwordSubmitting" :disabled="passwordSubmitting">
                Cambiar contraseña
              </UButton>
            </div>
          </form>
        </div>
      </div>
    </template>
  </div>
</template>
