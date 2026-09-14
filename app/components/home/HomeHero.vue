<script setup lang="ts">
const { profile } = useProfile()
const { projects } = useProjects()

// Datos de la ficha: se calculan desde el contenido, así no se desactualizan
const facts = computed(() => {
  const total = projects.value.length
  const clients = projects.value.filter((p) => p.kind === 'client').length
  return [
    { label: 'Trabajo', value: `${total} proyectos · ${clients} ${clients === 1 ? 'cliente real' : 'clientes reales'}` },
    { label: 'Stack', value: 'Vue · Node · PostgreSQL' },
    { label: 'Base', value: `${profile.value.location} · Remoto OK` },
  ]
})
</script>

<template>
  <section id="inicio" class="relative border-b border-line px-[clamp(16px,4vw,44px)] pt-[clamp(34px,6vw,84px)]">
    <div class="absolute left-3.5 top-3.5 size-3.5 border-l border-t border-lime" aria-hidden="true" />

    <div class="eyebrow mb-[clamp(22px,4vw,40px)] flex items-center gap-3 text-dim">
      <span>Ficha 001</span>
      <span class="h-px flex-1 bg-line" aria-hidden="true" />
      <span v-if="profile.availability" class="inline-flex items-center gap-[7px] bg-lime px-2.5 py-[5px] font-semibold text-ink">
        <span class="inline-block size-1.5 bg-ink animate-blip" aria-hidden="true" />
        Disponible full-time
      </span>
    </div>

    <p class="mb-[clamp(14px,2vw,22px)] font-mono text-[clamp(13px,1.5vw,16px)] font-semibold uppercase tracking-[0.1em] text-lime">
      {{ profile.name }} {{ profile.lastname }} — {{ profile.title }}
    </p>

    <h1 class="font-display text-[clamp(46px,11.6vw,168px)] font-extrabold uppercase leading-[0.82] tracking-[-0.05em]">
      <span class="block">Convierto</span>
      <span class="block font-medium tracking-[-0.035em] text-dim">procesos</span>
      <span class="inline-flex flex-wrap items-baseline gap-[0.18em]">
        en <span class="inline-block -rotate-[1.6deg] bg-lime px-[0.1em] pb-[0.04em] text-ink">producto</span>
      </span>
    </h1>

    <div class="mb-[clamp(22px,3.4vw,36px)] mt-[clamp(24px,4vw,44px)] flex flex-wrap items-end justify-between gap-[clamp(20px,3vw,44px)]">
      <p class="max-w-[46ch] flex-[1_1_340px] text-[clamp(16px,1.9vw,19px)] leading-normal text-soft text-pretty">
        {{ profile.heroDescription }}
      </p>
      <div class="flex flex-wrap items-center gap-2.5">
        <NuxtLink
          to="/#proyectos"
          class="inline-flex min-h-[54px] items-center bg-paper px-[26px] font-mono text-sm font-semibold uppercase tracking-[0.04em] text-ink transition-colors hover:bg-lime"
        >
          Ver trabajo ↓
        </NuxtLink>
        <CopyEmailButton />
      </div>
    </div>

    <dl class="flex flex-wrap gap-x-[clamp(28px,5vw,64px)] gap-y-3.5 border-t border-line pb-4 pt-3.5 font-mono">
      <div v-for="fact in facts" :key="fact.label" class="grid min-w-0 content-start gap-1">
        <dt class="eyebrow text-dim">{{ fact.label }}</dt>
        <dd class="text-[13px] text-paper">{{ fact.value }}</dd>
      </div>
    </dl>
  </section>
</template>
