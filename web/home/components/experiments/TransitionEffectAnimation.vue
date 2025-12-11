<template>
  <ExperimentsShowCard>
    <template #title>
      Transition Effect Animation
    </template>
    <template #description>
      <p>
        This effect mixes up blur and contrast filters with transition and hover.
      </p>
      <a href="https://medium.com/frontend-canteen/amazing-css-transition-tips-and-details-135dd7b823d">
        Original
      </a>
    </template>
    <template #show  class="container">
      <p id="name">
        Hidden Powers
      </p>
      <div class="card">
        <div class="snow" />
        <div class="snow" />
        <div class="snow" />
        <div class="snow" />
        <div class="snow" />
        <div class="snow" />
        <div class="snow" />
        <div class="snow" />
        <div class="snow" />
        <div class="snow" />
        <div class="snow" />
        <div class="snow" />
        <div class="snow" />
        <div class="snow" />
        <div class="snow" />
        <div class="snow" />
        <div class="snow" />
        <div class="snow" />
        <div class="snow" />
        <div class="snow" />
        <div class="snow" />
        <div class="snow" />
        <div class="snow" />
        <div class="snow" />
        <div class="snow" />
        <div class="snow" />
        <div class="snow" />
        <div class="snow" />
        <div class="snow" />
        <div class="snow" />
        <div class="snow" />
        <div class="snow" />
        <div class="snow" />
        <div class="snow" />
        <div class="snow" />
        <div class="snow" />
        <div class="snow" />
        <div class="snow" />
        <div class="snow" />
        <div class="snow" />
        <div class="snow" />
        <div class="snow" />
        <div class="snow" />
        <div class="snow" />
        <div class="snow" />
        <div class="snow" />
        <div class="snow" />
        <div class="snow" />
        <div class="snow" />
        <div class="snow" />
        <div class="snow" />
        <div class="snow" />
        <div class="snow" />
        <div class="snow" />
        <div class="snow" />
        <div class="snow" />
        <div class="snow" />
        <div class="snow" />
        <div class="snow" />
        <div class="snow" />
        <div class="snow" />
        <div class="snow" />
        <div class="snow" />
        <div class="snow" />
        <div class="snow" />
        <div class="snow" />
        <div class="snow" />
        <div class="snow" />
        <div class="snow" />
        <div class="snow" />
        <div class="snow" />
      </div>
    </template>
  </ExperimentsShowCard>
</template>

<style scoped lang="scss">

:root {
}
.container {
  width: 300px;
  height: 200px;
}

.card {
  $snow-size: 2em;
  width: $snow-size * 10;
  height: $snow-size * 10;
  padding: 0em;
  display: flex;
  flex-wrap: wrap;
  background: black;
  filter: blur(10px) contrast(10);

  .snow {
    position: relative;
    width: $snow-size;
    height: $snow-size;
    border-radius: 100%;

    &::after {
      position: absolute;
      content: "";
      left: 0;
      width: inherit;
      height: inherit;
      background: white;
      transition: 30s cubic-bezier(0.19, 1, 0.22, 1);
    }

    &:hover::after {
      transform: scale(0);
      transition-duration: 0.3s;
    }
  }
}

#name {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 9999;
  color: white;
  font-family: Lato, sans-serif;
  font-size: 4em;
  line-height: 1em;
  letter-spacing: 0.1em;
  transform: translate(-50%, -50%);
  pointer-events: none;
  filter: blur(1px) contrast(20);
}

</style>
