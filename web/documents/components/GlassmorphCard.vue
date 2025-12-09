<template>
  <div class="container">
    <div class="card">
      <div class="front">
        <slot name="front"></slot>
      </div>
      <div class="back">
        <slot name="back"></slot>
      </div>
    </div>
  </div>

</template>

<script setup>
  const props = defineProps({
    width: {
      type: String,
      default: '300px'
    }, height: {
      type: String,
      default: '300px'
    }
  })

</script>
<style scoped >
* {
  box-sizing: border-box;  
}

.container {
  perspective: 800px;
}

.card {
  height:  v-bind(props.height);
  width: v-bind(props.width);
  position: relative;
  transform-style: preserve-3d;
}

.front,
.back {
  --white-rgba: rgba(255, 255, 255, 0.12);
  position: absolute;
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  border-radius: 15px;
  background-color: var(--white-rgba);
  border: 2px solid var(--white-rgba);
  backdrop-filter: blur(8px);
  
  backface-visibility: hidden;
  transition: 1s;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.front {
  flex-direction: column;
  justify-content: center;
  gap: 50px;
}

.front img {
  --white-rgba: rgba(255, 255, 255, 0.12);
  height: 140px;
  width: 140px;
  border-radius: 50%;
  border: 10px solid var(--white-rgba);
}

.back {
  justify-content: space-around;
  transform: rotateY(180deg);
}

.card:hover .back {
  transform: rotateY(0deg);
}

.card:hover .front {
  transform: rotateY(-180deg);
}
</style>