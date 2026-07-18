<template>

  <h1>{{title}}</h1>
  <p>{{description}}</p>
  <img :src="image" alt="">
  <div class="palette">
    <div>
      {{ color1 }}
    </div>
    <div>
      {{ color2 }}
    </div>
    <div>
      {{ color3 }}
    </div>
    <div>
      {{ color4 }}
    </div>
    <div>
      {{ color5 }}
    </div>
  </div>

</template>
<script setup>
  import { ref, computed } from 'vue'
  
  const props = defineProps({
    title: {
      type: String
    },
    image: {
      type: String
    },
    description: {
      type: String
    },
    colors: {
      type: String
    }
  })

  const color1 = computed(() => JSON.parse(props.colors)[0])
  const color2 = computed(() => JSON.parse(props.colors)[1])
  const color3 = computed(() => JSON.parse(props.colors)[2])
  const color4 = computed(() => JSON.parse(props.colors)[3])
  const color5 = computed(() => JSON.parse(props.colors)[4])
</script>
<style scoped>
  .palette {
    display: flex;
    color: white;
    width: 400px;
    height: 40px;
  }
  div {
    padding: 0.4rem;
    width: 90px;
    height: 30px;
  }
  div:nth-of-type(1) {
    background-color: v-bind(color1);
  }
  div:nth-of-type(2) {
    background-color: v-bind(color2);
  }
  div:nth-of-type(3) {
    background-color: v-bind(color3);
  }
  div:nth-of-type(4) {
    background-color: v-bind(color4);
  }
  div:nth-of-type(5) {
    background-color: v-bind(color5);
  }
</style>