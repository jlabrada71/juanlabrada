<template>
  <ExperimentsShowCard>
    <template #title>
      Bright Border
    </template>
    <template #description>
      <p>This is effect uses a conic gradient rotating in the :before element and a smaller dark element in the :after in order to pull off this.</p>
      <a href="https://medium.com/frontend-canteen/fantastic-css-border-animation-b02e06828beb">Original</a>
    </template>
    <template #show  class="container">
      <div class="conic" />
      <div class="conic conic-demo" />
    </template>
  </ExperimentsShowCard>
</template>

<style scoped lang="scss">

@keyframes rotate {
  100% {
    transform: rotate(1turn);
  }
}

.conic {
  position: relative;
  z-index: 0;
  width: 400px;
  height: 300px;
  margin: 20px;
  border-radius: 10px;
  overflow: hidden;
  padding: 2rem;

  &::before {
    content: '';
    position: absolute;
    z-index: -2;
    /* in order for the gradient to fully cover the border we'll need it to be twice as big as the main item */
    width: 200%;
    height: 200%;
    /* since the size is twice as the main element we need to move the center 50% in order to have the gradient rotate from the center */
    left: -50%;
    top: -50%;
    background-color: #1a232a;
    background-position: 0 0;
    /* this conic gradient starts in trasparent color the moves to a bluish tone and the returns back to transparent
       the last transparent starts at a 30% of the cone, so the "light" area is about 30% of the gradient
       in the 15% we find the most illuminated fragment of the gradient which makes the effect possible.
    */
    background-image: conic-gradient(transparent, rgba(168, 239, 255, 1), transparent 30%);
    animation: rotate 4s linear infinite; /* this animation rotates the conic gradient background */
  }

  &::after {
    content: '';
    position: absolute;
    z-index: -1;
    left: 6px;  /* relative to the outer box the inner is displaced 6px */
    top: 6px;
    width: calc(100% - 12px);  /* substract the border from the width 6px + 6px */
    height: calc(100% - 12px);
    background: #000;
    border-radius: 5px; /* make the inner border rounded */
  }
}

/* this small animation reduces opacity to show how the effect works */
.conic-demo::after {
  animation: opacityChange 5s infinite linear;
}

@keyframes opacityChange {
  50% {
    opacity:.5;
  }
  100% {
    opacity: 1;
  }
}

</style>
