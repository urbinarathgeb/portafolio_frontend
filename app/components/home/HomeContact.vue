<script setup lang="ts">
const toast = useToast()
const { profile } = useProfile()
const { form, loading, error, submit } = useContact()

const handleSubmit = async () => {
  const ok = await submit()
  if (ok) {
    toast.add({ title: 'Mensaje enviado', description: 'Te respondo a la brevedad.', color: 'success' })
  } else if (error.value) {
    toast.add({ title: 'Error', description: error.value, color: 'error' })
  }
}
</script>

<template>
  <section id="contacto" class="relative bg-lime px-[clamp(16px,4vw,44px)] pb-[clamp(30px,5vw,56px)] pt-[clamp(38px,6.5vw,88px)] text-ink">
    <div class="eyebrow mb-[clamp(18px,3vw,30px)] flex items-center gap-3 font-semibold">
      <span>Ficha 001 / Fin</span>
      <span class="h-px flex-1 bg-ink/30" aria-hidden="true" />
      <span>Contacto</span>
    </div>

    <h2 class="mb-5 font-display text-[clamp(40px,11vw,150px)] font-extrabold uppercase leading-[0.82] tracking-[-0.055em]">
      <span class="block">Trabajemos</span>
      <span class="block font-medium tracking-[-0.04em] text-ink/55">juntos.</span>
    </h2>

    <p class="mb-[clamp(24px,4vw,38px)] max-w-[46ch] text-[clamp(16px,1.9vw,20px)] font-medium leading-[1.45] text-pretty">
      Busco mi próxima posición full-time en un equipo donde el craft importa. Si estás construyendo algo que vale la pena, quiero escucharte.
    </p>

    <!-- Canal principal: email -->
    <div class="flex flex-wrap items-center gap-2.5">
      <a
        :href="`mailto:${profile.email}`"
        class="inline-flex min-h-14 items-center bg-ink px-[26px] font-mono text-[clamp(14px,1.6vw,17px)] font-semibold text-lime transition-colors hover:bg-ink-3"
      >
        {{ profile.email }}
      </a>
      <CopyEmailButton tone="lime" :show-email="false" />
      <a
        href="/cv-javier-urbina.pdf"
        target="_blank"
        rel="noopener"
        class="inline-flex min-h-14 items-center px-4 font-mono text-sm font-semibold uppercase underline underline-offset-[5px]"
      >
        CV ↗
      </a>
      <a
        href="https://www.linkedin.com/in/urbinarathgeb"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex min-h-14 items-center px-4 font-mono text-sm font-semibold uppercase underline underline-offset-[5px]"
      >
        LinkedIn ↗
      </a>
      <a
        href="https://github.com/urbinarathgeb"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex min-h-14 items-center px-4 font-mono text-sm font-semibold uppercase underline underline-offset-[5px]"
      >
        GitHub ↗
      </a>
    </div>

    <!-- Alternativa: formulario (funciona aunque no haya un cliente de correo) -->
    <div class="mt-[clamp(28px,4.5vw,48px)] border-t border-ink/30 pt-[clamp(22px,3vw,30px)]">
      <p id="form-titulo" class="eyebrow mb-3.5 font-semibold text-ink/70">O escríbeme desde aquí</p>
      <form
        class="relative flex max-w-[620px] flex-wrap items-start gap-2"
        aria-labelledby="form-titulo"
        novalidate
        @submit.prevent="handleSubmit"
      >
        <label class="min-w-0 flex-[1_1_200px]">
          <span class="sr-only">Tu email</span>
          <input v-model="form.email" type="email" name="email" autocomplete="email" placeholder="tu@empresa.com" class="field">
        </label>
        <label class="min-w-0 flex-[1_1_100%]">
          <span class="sr-only">Mensaje</span>
          <input v-model="form.mensaje" type="text" name="message" placeholder="Vacante o proyecto" class="field">
        </label>

        <!-- Honeypot anti-spam: invisible para personas y lectores de pantalla -->
        <div class="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
          <label>
            No completar
            <input v-model="form.website" type="text" name="website" tabindex="-1" autocomplete="off">
          </label>
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="min-h-[50px] flex-[0_0_auto] border border-ink px-5 font-mono text-[13px] font-semibold uppercase tracking-[0.06em] text-ink transition-colors hover:bg-ink hover:text-lime disabled:cursor-not-allowed disabled:opacity-60"
        >
          {{ loading ? 'Enviando…' : 'Enviar →' }}
        </button>
      </form>
    </div>
  </section>
</template>

<style scoped>
.field {
  width: 100%;
  min-height: 50px;
  padding: 0 14px;
  border: 1px solid color-mix(in oklch, var(--color-ink) 35%, transparent);
  background: var(--color-lime);
  color: var(--color-ink);
  font-family: var(--font-mono);
  font-size: 14px;
}

.field::placeholder {
  color: color-mix(in oklch, var(--color-ink) 72%, transparent);
  opacity: 1;
}

.field:focus-visible {
  outline: 2px solid var(--color-ink);
  outline-offset: 1px;
  border-color: var(--color-ink);
}
</style>
