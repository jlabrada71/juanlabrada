<template>
  <ExperimentsShowCard>
    <template #title>
      Image Gallery
    </template>
    <template #description>
      <p>Using clip path to change the visual shape of an image. </p>
      <a target="_blank" href="https://css-tricks.com/css-grid-and-custom-shapes-part-1/">Original</a>
    </template>
    <template #show  class="container">
      <div class="gallery">
        <img src="@/assets/images/1028-400x400.jpg" alt="a forest after an apocalypse">
        <img src="@/assets/images/15-400x400.jpg" alt="a waterfall and many rocks">
        <img src="@/assets/images/1040-400x400.jpg" alt="a house on a mountain">
        <img src="@/assets/images/106-400x400.jpg" alt="sime pink flowers">
      </div>
    </template>
  </ExperimentsShowCard>
</template>

<style scoped>
:root {
    --borderColor: #03A9F3;
}

.container {
  margin: 0;
  min-height: 200px;
  display: grid;
  place-content: center;
  background: #ECD078;
}

.gallery {
  --s: 200px; /* control the size */
  --r: 45px;  /* control the triangular shape */

  display: grid;
  gap: 6px;
  grid: auto-flow var(--s)/repeat(2,var(--s));
  cursor: pointer;
}
.gallery > img {
  object-fit: cover;
  transition: .5s;
}
.gallery > img:is(:nth-child(1),:nth-child(4)) {
  width: 100%;
  height: calc(100% + var(--r));
}
.gallery > img:is(:nth-child(2),:nth-child(3)) {
  height: 100%;
  width: calc(100% + var(--r));
}
.gallery > img:nth-child(1) {
  clip-path: polygon(0 0, 100% 0, calc(100% - var(--r)) calc(50% - var(--r)/2),100% calc(100% - var(--r)),50% 100%,0 calc(100% - var(--r)))
}
.gallery > img:nth-child(2) {
  place-self: end;
  clip-path: polygon(var(--r) 0,100% 0,100% 100%,calc(50% + var(--r)/2) calc(100% - var(--r)),var(--r) 100%,0 50%)
}
.gallery > img:nth-child(3) {
  clip-path: polygon(0 0,calc(50% - var(--r)/2) var(--r),calc(100% - var(--r)) 0,100% 50%,calc(100% - var(--r)) 100%,0 100%)
}
.gallery > img:nth-child(4) {
  place-self: end;
  clip-path: polygon(0 var(--r), 50% 0,100% var(--r),100% 100%,0 100%,var(--r) calc(50% + var(--r)/2))
}
.gallery:hover {
  --r: 0px;
}
</style>
