<template>
  <ShowCard>
    <template #title>
      Glue Contrast
    </template>
    <template #description>
      <p>
        This experiment mixes up a contrast filter with a blur filter. In the right proportion it accomplishes this nice effect.
      </p>
    </template>
    <template #show  class="container">
      <div class="filter-mix" />
    </template>
  </ShowCard>
</template>

<style scoped lang="scss">

.container {
  width: 300px;
  height: 200px;
  background: white;
  overflow: hidden;
  text-align: center;
  color: transparent;
  backface-visibility: hidden;
}

.filter-mix {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 200px;
  filter: contrast(20);
  background: #fff;
}

.filter-mix::before {
  content: "";
  position: absolute;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: #333;
  top: 40px;
  left: 40px;
  z-index: 2;
  filter: blur(6px);
  box-sizing: border-box;
  animation: filterBallMove 4s ease-out infinite;
}

.filter-mix::after {
  content: "";
  position: absolute;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #3F51B5;
  top: 60px;
  right: 40px;
  z-index: 2;
  filter: blur(6px);
  animation: filterBallMove2 4s ease-out infinite;
}

@keyframes filterBallMove {
  50% {
    left: 140px;
  }
}

@keyframes filterBallMove2 {
  50% {
    right: 140px;
  }
}

</style>
