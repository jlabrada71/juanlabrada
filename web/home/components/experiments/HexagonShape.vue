<template>
  <ExperimentsShowCard>
    <!-- <template #title>
      Hexagon Shaped Image
    </template>
    <template #description>
      <p>Using clip path to change the visual shape of an image. </p>
      <a target="_blank" href="https://css-tricks.com/css-grid-and-custom-shapes-part-1/">Original</a>
    </template> -->
    <template #show  class="container">
      <div class="gallery">
        <img src="@/assets/images/1028-400x400.jpg" alt="a forest after an apocalypse">
        <img src="@/assets/images/15-400x400.jpg" alt="a waterfall and many rocks">
        <img src="@/assets/images/1040-400x400.jpg" alt="a house on a mountain">
        <img src="@/assets/images/106-400x400.jpg" alt="sime pink flowers">
        <img src="@/assets/images/136-400x400.jpg" alt="big rocks with some trees">
        <img src="@/assets/images/1039-400x400.jpg" alt="a waterfall, a lot of tree and a great view from the sky">
        <img src="@/assets/images/110-400x400.jpg" alt="a cool landscape">
        
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
  min-height: 300px;
  display: grid;
  place-content: center;
  background: #aabbfb;
}

.gallery {
  --s: 130px; /* control the size */
  --g: 10px;  /* control the gap */
  display: grid;
  margin: calc(var(--s) + var(--g));
}

.gallery > img {
  grid-area: 1/1;
  width: var(--s);
  aspect-ratio: 0.866;
  object-fit: cover;
  clip-path: polygon(0% 25%,0% 75%,50% 100%,100% 75%,100% 25%,50% 0);
  transform: translate(var(--_x,0),var(--_y,0)) scale(var(--_t,1));
  cursor: pointer;
  filter: grayscale(90%);
  transition: 0.3s linear;
}

.gallery > img:hover {
  filter: grayscale(0);
  z-index: 1;
  --_t: 2;
}

.gallery > img:nth-child(1) {--_x: calc(-100% - var(--g))}
.gallery > img:nth-child(7) {--_x: calc( 100% + var(--g))}
.gallery > img:nth-child(3),
.gallery > img:nth-child(5) {--_y: calc(-75% - .87*var(--g))}
.gallery > img:nth-child(4),
.gallery > img:nth-child(6) {--_y: calc( 75% + .87*var(--g))}
.gallery > img:nth-child(3),
.gallery > img:nth-child(4) {--_x: calc(-50% - .5*var(--g))}
.gallery > img:nth-child(5),
.gallery > img:nth-child(6) {--_x: calc( 50% + .5*var(--g))}

/*
translate((height + gap)*sin(0deg), (height + gap)*cos(0))
translate((height + gap)*sin(60deg), (height + gap)*cos(60deg))
translate((height + gap)*sin(120deg), (height + gap)*cos(120deg))
translate((height + gap)*sin(180deg), (height + gap)*cos(180deg))
translate((height + gap)*sin(240deg), (height + gap)*cos(240deg))
translate((height + gap)*sin(300deg), (height + gap)*cos(300deg))
*/

</style>
