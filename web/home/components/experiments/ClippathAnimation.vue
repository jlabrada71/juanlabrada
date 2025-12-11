<template>
  <ExperimentsShowCard>
    <template #title>
      Clip path animation
    </template>
    <template #description>
      <p>Border animation using Clippath. </p>
      <a href="https://medium.com/frontend-canteen/fantastic-css-border-animation-b02e06828beb">Original</a>
    </template>
    <template #show  class="container">
      <div class="bt">
        Hello
      </div>
      <div class="bt bg">
        Hello
      </div>
    </template>
  </ExperimentsShowCard>
</template>

<style scoped lang="scss">

:root {
    --borderColor: #03A9F3;
}

.bt {
    position: relative;
    margin: auto;
    width: 160px;
    line-height: 160px;
    text-align: center;
    font-size: 24px;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border: 2px solid gold;
        transition: all .5s;
        animation: clippath 3s infinite linear;
    }
}

@keyframes clippath {
    0%,
    100% {
        clip-path: inset(0 0 95% 0);
    }
    25% {
        clip-path: inset(0 95% 0 0);
    }
    50% {
        clip-path: inset(95% 0 0 0);
    }
    75% {
        clip-path: inset(0 0 0 95%);
    }
}

.bg::before {
    background: rgba(255, 215, 0, .5);
}

</style>
