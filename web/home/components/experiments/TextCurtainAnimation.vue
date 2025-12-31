<template>
  <ShowCard>
    <template #title>
      Text Wave Effect
    </template>
    <template #description>
      <p>Nice and simple effect in SCSS using before and after directives. </p>
      <a target="_blank" href="https://csscoco.com/inspiration/#/./blendmode/mixblend-text-wave-effect">Original</a>
    </template>
    <template #show  class="container">
      <p class="curtain">
        WAVE
      </p>
    </template>
  </ShowCard>
</template>

<style scoped lang="scss">

.container {
  box-sizing: border-box;
  padding: 20px;
  width: 600px;
  height: 200px;
  display: flex;
  justify-content: center;
}

.curtain {
  width: 100%;
  padding: 50px;
  text-align: center;
    position: relative;
    font-size: 120px;
    font-weight: bold;
    background: #fff;
    color: #000;
    overflow: hidden;

    &::before,
    &::after {
        content: "";
        position: absolute;
        top: -350px;
        left: 50%;
        width: 800px;
        height: 800px;
        border-radius: 45% 48% 43% 47%;
        transform: translate(-50%, -50%);
        background: rgba(3, 169, 244, .85);
        animation: rotate 10s infinite linear;
        z-index: 1;
        mix-blend-mode: lighten;
    }
    &::after {
        border-radius: 43% 47% 44% 48%;
        animation: rotate 10s infinite .5s linear;
    }
}

@keyframes rotate {
    0% {
        transform: translate(-50%, -50%) rotate(0);
    }
    100% {
        transform: translate(-50%, -50%) rotate(360deg);
    }
}
</style>
