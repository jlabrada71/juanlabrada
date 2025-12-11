<template>
  <ExperimentsShowCard>
    <template #title>
      Glowing Loader Animation
    </template>
    <template #description>
      <p>
        This is a simple effect that makes use of SVG filter to produce the glowing effect.
      </p>
      <a target="_blank" href="https://codepen.io/Chokcoco/pen/dyRQEKQ">Original</a>
    </template>
    <template #show  class="container">
      <div class="loader" />
    </template>
  </ExperimentsShowCard>
</template>

<style scoped lang="scss">
.container {
  position: relative;
  width: 340px;
  height: 200px;
  display: flex;
}

.loader {
    position: relative;
    margin: auto;
    width: 60px;
    height: 60px;
    --colorA: #b78eff;

    &::before,
    &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        border-radius: 50%;
        border-top: 10px solid #fff;
        filter:
            drop-shadow(0 0 2px var(--colorA))
            drop-shadow(0 0 5px var(--colorA))
            drop-shadow(0 0 10px var(--colorA))
            drop-shadow(0 0 20px var(--colorA));
        animation: rotate 3s infinite linear;
    }

    &::after {
        --colorA: #ffec41;
        animation-delay: -1.5s;
    }
}

@keyframes rotate {
    100% {
        transform: rotate(360deg);
    }
}

</style>
