<template>
  <li v-for="key of Object.keys(config.public)">
    {{ key }} - {{ config.public[key] }}
  </li>

</template>
<script setup>
  const config = useRuntimeConfig()
</script>