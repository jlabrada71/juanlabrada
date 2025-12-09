<template>
 <div class="test">
   <v-container>
     <TestForm />
   </v-container>
  </div>

</template>
<script>

import TestForm from '@/test-vuetify/components/TestForm.vue'

export default {
  name: 'TestView',

  components: {
    TestForm
  },

  methods: {
  }
}

</script>
<style>
</style>
