<template>
  <ShowCard>
    <template #title>
      Glow Animation
    </template>
    <template #description>
      <p>
        This is a simple effect that makes use of SVG filter to produce the glowing effect.
      </p>
      <a target="_blank" href="https://codepen.io/Chokcoco/pen/dyRQEKQ">Original</a>
    </template>
    <template #show  class="container">
      <svg width="300" height="140" OK xmlns="http://www.w3.org/2000/svg">
        <rect x="30" y="30" class="rect" height="80px" width="240px" />
      </svg>
      <div class="hover-text">
        HOVER ME
      </div>
    </template>
  </ShowCard>
</template>

<style scoped lang="scss">
.container {
  position: relative;
  width: 340px;
  height: 180px;
  margin: auto;

  .hover-text {
    position: absolute;
    top: 30px;
    left: 30px;
    line-height: 80px;
    width: 240px;
    color: #fff;
    font-size: 24px;
    text-align: center;
    cursor: pointer;
  }

  &:hover .rect {
    stroke-dasharray: 640px;
    stroke-dashoffset: 0;
  }
}

.rect {
    fill: none;
    stroke-width: 3;
    stroke-linejoin: round;
    stroke: #fff;
    stroke-dasharray: 640px;
    stroke-dashoffset: 640px;
    transition: all .5s ease-in-out;
    filter: drop-shadow(0 0 2px #f24983) drop-shadow(0 0 4px #f24983) drop-shadow(0 0 8px #f24983) drop-shadow(0 0 12px #f24983);
}
</style>
