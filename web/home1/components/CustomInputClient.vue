<template>
  <CustomInput
    :modelValue="searchText"
    @update:modelValue="newValue => searchText = newValue"
  />

  <CustomInput v-model:title="searchText2" />
</template>
<script setup>
  import { ref } from 'vue'

  const searchText = ref('test value')
  const searchText2 = ref('test value')

</script>