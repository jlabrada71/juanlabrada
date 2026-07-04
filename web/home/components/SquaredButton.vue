<template>
  <NuxtLink :to="props.url">
    <span :class="props.variant === 'primary' ? 'btn-primary-cyber' : 'btn-ghost-cyber'">
      {{ props.title }}
    </span>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  title:   { type: String, required: true, default: '' },
  url:     { type: String, required: false, default: '' },
  variant: { type: String, default: 'ghost' },
})
</script>
