<!-- CustomInput.vue -->
<script setup>
  import { computed } from 'vue'
  
  const props = defineProps(['title'])
  const emit = defineEmits(['update:title'])
  
  const value = computed({
    get() {
      return props.title
    },
    set(value) {
      emit('update:title', value)
    }
  })
  </script>
  
  <template>
    <input v-model="value" />
  </template>