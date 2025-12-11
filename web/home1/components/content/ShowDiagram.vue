<script setup>
import VueMermaidString from 'vue-mermaid-string';

const props = defineProps({
  diagram: {
    type: String,
    required: true,
  },
});

watchEffect(() => {
  console.log('Diagram updated:', props.diagram);
});

</script>

<template>
  <slot></slot>
  <VueMermaidString :value="props.diagram" />
</template>

<style scoped>
</style>
