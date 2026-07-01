<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'auth',
  pageTransition: false,
})

const { contacts, loading, error, fetchAll, markAsRead } = useAdminContacts()
const toast = useToast()

onMounted(() => {
  fetchAll()
})

const handleMarkAsRead = async (id: number) => {
  const success = await markAsRead(id)
  if (success) {
    toast.add({ title: 'Marcado como leído', color: 'success' })
  } else {
    toast.add({ title: 'Error', description: 'No se pudo marcar como leído', color: 'error' })
  }
}

const unreadCount = computed(() => contacts.value.filter(c => !c.isRead).length)
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-1">
      <h1 class="font-heading text-2xl font-bold text-highlighted">Contactos</h1>
      <UBadge v-if="unreadCount > 0" color="error" variant="solid" size="lg">
        {{ unreadCount }} sin leer
      </UBadge>
    </div>
    <p class="text-muted text-sm">Mensajes recibidos desde el formulario de contacto</p>

    <div role="status" aria-live="polite" aria-atomic="true">
      <div v-if="loading" class="mt-8 space-y-3">
        <div v-for="i in 5" :key="i" class="h-20 rounded-xl bg-bg-elevated animate-pulse" />
      </div>

      <UAlert
        v-else-if="error"
        color="error"
        variant="subtle"
        title="Error"
        :description="error"
        class="mt-8"
      />

      <div v-else-if="contacts.length === 0" class="mt-8">
        <UAlert
          icon="i-lucide-inbox"
          color="neutral"
          variant="subtle"
          title="Sin mensajes"
          description="No hay mensajes de contacto todavía."
        />
      </div>

      <div v-else class="mt-8 space-y-4">
      <NuxtLink
        v-for="contact in contacts"
        :key="contact.id"
        :to="`/admin/contacts/${contact.id}`"
        class="block rounded-xl bg-bg-elevated border border-border p-6 no-underline transition-all duration-200 hover:shadow-md hover:border-primary/20 hover:-translate-y-0.5"
        :class="{ 'border-l-4 border-l-primary': !contact.isRead }"
      >
        <div class="flex items-start justify-between gap-5">
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2">
              <h3 class="text-sm font-semibold text-highlighted truncate">{{ contact.name }}</h3>
              <span v-if="!contact.isRead" class="size-2 rounded-full bg-primary shrink-0" />
            </div>
            <p class="text-xs text-muted mt-0.5">{{ contact.email }}</p>
            <p class="text-sm text-toned mt-2 line-clamp-2">{{ contact.message }}</p>
          </div>
          <div class="flex flex-col items-end gap-2 shrink-0">
            <span class="text-xs text-muted whitespace-nowrap">{{ formatDate(contact.createdAt) }}</span>
            <UBadge
              v-if="contact.interest"
              :color="getInterestColor(contact.interest)"
              variant="subtle"
              size="sm"
            >
              {{ getInterestLabel(contact.interest) }}
            </UBadge>
          </div>
        </div>
        <div v-if="!contact.isRead" class="flex justify-end mt-3">
          <UButton
            color="neutral"
            variant="ghost"
            size="md"
            class="min-h-11"
            @click.prevent="handleMarkAsRead(contact.id)"
          >
            Marcar como leído
          </UButton>
        </div>
      </NuxtLink>
    </div>
    </div>
  </div>
</template>
