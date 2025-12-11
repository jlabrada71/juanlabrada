<template>
  <DaisyuiAlert title="Notification" :message="props.message" :show="show" @close="()=> show = false"></DaisyuiAlert>
</template>
<script setup>
  import { ref, computed } from 'vue';

  const emit = defineEmits(['update:show']);

  const props = defineProps({
    message: {
      type: String,
      required: true
    },
    show: {
      type: Boolean,
      required: true
    },
    timeout: {
      type: Number,
      default: 3000
    }
  });

  const show = computed({
    get() {
      return props.show;
    },
    set(value) {
      emit('update:show', value);
    }
  });
</script>