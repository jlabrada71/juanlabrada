<template>
  <ExperimentsShowCard>
    <template #title>
      Triangle offset-distance animation
    </template>
    <template #description>
      <p>
        The triangle is animated using a combination of offset-path, offset-anchor and offset-distance properties.
        The offset-path defines the path, and the offset-distance the position within the path.
      </p>
      <a target="_blank" href="https://codepen.io/Chokcoco/pen/poRGZeE">
        Original
      </a>
    </template>
    <template #show  class="container">
      <svg class="g-svg" width="400" height="160" xmlns="http://www.w3.org/2000/svg">
        <path d="M 10 80 C 80 10, 130 10, 190 80 S 300 150, 360 80" stroke="black" fill="transparent" />
      </svg>
      <div class="g-wrap">
        <div class="triang" />
      </div>
    </template>
  </ExperimentsShowCard>
</template>

<style scoped lang="scss">
:root {
}
.container {
  width: 900px;
  height: 400px;
  background-color:#222f3e;
  display: flex;
}

.g-svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.g-wrap {
    position: relative;
    width: 400px;
    height: 160px;
    margin: auto;
    // outline: 1px solid #000;
}

.triang {
    position: aboslute;
    width: 40px;
    height: 40px;
    clip-path: polygon(0 0, 100% 50%, 0 100%);
    offset-path: path('M 10 80 C 80 10, 130 10, 190 80 S 300 150, 360 80');
    offset-anchor: 0 100%;
    background: linear-gradient(#fc0, #f0c);
    animation: move 3000ms infinite alternate linear;
}

@keyframes move {
    0% {
        offset-distance: 0%;
    }
    100% {
        offset-distance: 100%;
    }
}

</style>
