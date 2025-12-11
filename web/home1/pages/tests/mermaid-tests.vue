<template>
  <div>
    <h1>Mermaid Demo</h1>
    <MermaidComponent :code ="code" :options="options"></MermaidComponent>
  </div>
</template>
<script setup>

  const code = ref(`
   graph TD;
        A-->B;
        A-->C;
        B-->D;
        C-->D;
  `)

  const options = ref({
    theme: 'default',
    logLevel: 3,
    securityLevel: 'loose',
    block: {
      padding: 10,
    },
  });
</script>