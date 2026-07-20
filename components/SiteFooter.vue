<template>
  <footer class="w-full py-6 px-6 text-center" style="background: #0b1326;">
    <p class="text-sm text-cyber-muted">v{{ appVersion }}</p>
  </footer>
</template>

<script setup>
const config = useRuntimeConfig()
const appVersion = config.public.appVersion
</script>
