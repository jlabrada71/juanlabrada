<script setup>
  const counter = useState('counter', () => Math.round(Math.random() * 1000))
  const sameCounter = useState('counter')
  </script>
  
  <template> 
      <div>Counter: {{ counter }}</div>
      <div>Same Counter: {{ sameCounter }}</div>
      <div>
        <button class="font-mono" @click="counter++">
          +
        </button>
        <button class="font-mono" @click="counter--">
          -
        </button>
      </div>
  </template>