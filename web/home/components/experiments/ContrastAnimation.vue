<template>
  <ShowCard>
    <template #title>
      Contrast Animation
    </template>
    <template #description>
      <p>Nice and simple effect in SCSS using mix-blend-mode. </p>
      <a href="https://medium.com/frontend-canteen/fantastic-css-border-animation-b02e06828beb">Original</a>
    </template>
    <template #show  class="container">
      <div id="button" />
    </template>
  </ShowCard>
</template>

<style scoped lang="scss">

:root {
}
.container {
  width: 300px;
  height: 200px;
}

#button {
    height: 100vh;
    background: linear-gradient(45deg, #000 0, #000 50%, #fff 50%);
    &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #fff;
        font-size: 120px;
        white-space: nowrap;
        mix-blend-mode: difference;
        animation: move 3s infinite linear alternate;
    }
}

@keyframes move {
    0% {
        transform: translate(-30%, -50%);
    }
    100% {
        transform: translate(-70%, -50%);
    }
}

</style>
