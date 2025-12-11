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
        <img src="@/assets/images/1039-400x400.jpg" alt="a house on a mountain">
        <img src="@/assets/images/106-400x400.jpg" alt="sime pink flowers">
        <img src="@/assets/images/136-400x400.jpg" alt="big rocks with some trees">
        <img src="@/assets/images/1039-400x400.jpg" alt="a waterfall, a lot of tree and a great view from the sky">
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
  background: #557c75;
}

.gallery {
  display: grid;
  gap: 10px;
  grid-template-columns: auto 0 auto;
  place-items: center;
}
.gallery > img {
  width: 200px; /* control the size */
  aspect-ratio: 1;
  object-fit: cover;
  transition: .35s;
  filter: grayscale();
  cursor: pointer;
}
.gallery > img:hover {
  filter: grayscale(0%);
}

.gallery > img:nth-child(1) {
  clip-path: polygon(0 0,50% 0,100% 100%,0 100%);
}
.gallery > img:nth-child(2) {
  clip-path: polygon(0 0,100% 0,50% 100%);
}
.gallery > img:nth-child(3) {
  clip-path: polygon(50% 0,100% 0,100% 100%,0 100%);
}
.gallery > img:nth-child(4) {
  clip-path: polygon(0 0,100% 0,50% 100%,0 100%);
}
.gallery > img:nth-child(5) {
  clip-path: polygon(50% 0,100% 100%,0% 100%);
}
.gallery > img:nth-child(6) {
  clip-path: polygon(0 0,100% 0,100% 100%,50% 100%);
}

</style>
