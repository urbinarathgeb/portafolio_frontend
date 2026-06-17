<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'auth',
  pageTransition: false,
})

const route = useRoute()
const { contacts, fetchAll, markAsRead } = useAdminContacts()
const toast = useToast()
const router = useRouter()

const isReady = ref(false)

const contact = computed(() => {
  const id = Number(route.params.id)
  return contacts.value.find(c => c.id === id) || null
})

onMounted(async () => {
  if (contacts.value.length === 0) {
    await fetchAll()
  }
  isReady.value = true

  if (contact.value && !contact.value.isRead) {
    const success = await markAsRead(contact.value.id)
    if (success) {
      toast.add({ title: 'Marcado como leído', color: 'success' })
    }
  }
})
</script>

<template>
  <div>
    <UButton
      color="neutral"
      variant="ghost"
      class="mb-6"
      @click="navigateTo('/admin/contacts')"
    >
      <template #leading>
        <UIcon name="i-lucide-arrow-left" class="size-4" />
      </template>
      Volver
    </UButton>

    <div v-if="!isReady" class="h-64 rounded-xl bg-bg-elevated animate-pulse" />

    <UAlert
      v-else-if="!contact"
      color="warning"
      variant="subtle"
      title="No encontrado"
      description="El mensaje de contacto no existe o ha sido eliminado."
    />

    <template v-else>
      <div class="flex items-center gap-2 mb-1">
        <h1 class="font-heading text-2xl font-bold text-highlighted">{{ contact.name }}</h1>
        <UBadge
          v-if="!contact.isRead"
          color="primary"
          variant="solid"
          size="sm"
        >
          Sin leer
        </UBadge>
        <UBadge
          v-else
          color="neutral"
          variant="subtle"
          size="sm"
        >
          Leído
        </UBadge>
      </div>

      <div class="flex flex-wrap items-center gap-x-6 gap-y-1 mt-2 text-sm text-muted">
        <span class="flex items-center gap-1.5">
          <UIcon name="i-lucide-mail" class="size-4" />
          {{ contact.email }}
        </span>
        <span v-if="contact.company" class="flex items-center gap-1.5">
          <UIcon name="i-lucide-building" class="size-4" />
          {{ contact.company }}
        </span>
        <span v-if="contact.interest" class="flex items-center gap-1.5">
          <UIcon name="i-lucide-tag" class="size-4" />
          <UBadge :color="getInterestColor(contact.interest)" variant="subtle" size="sm">
            {{ getInterestLabel(contact.interest) }}
          </UBadge>
        </span>
        <span class="flex items-center gap-1.5">
          <UIcon name="i-lucide-calendar" class="size-4" />
          {{ formatDate(contact.createdAt) }}
        </span>
      </div>

      <div class="mt-8 rounded-xl bg-bg-elevated border border-border p-6">
        <h2 class="text-sm font-semibold text-muted uppercase tracking-wider mb-3">Mensaje</h2>
        <p class="text-highlighted leading-relaxed whitespace-pre-wrap">{{ contact.message }}</p>
      </div>
    </template>
  </div>
</template>
