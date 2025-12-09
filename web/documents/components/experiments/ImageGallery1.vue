<template>
  <ExperimentsShowCard>
    <!-- <template #title>
      Image Gallery
    </template>
    <template #description>
      <p>Changing the image width on hover within a grid. </p>
      <a target="_blank" href="https://css-tricks.com/css-grid-and-custom-shapes-part-1/">Original</a>
    </template> -->
    <template #show  class="container">
      <div class="gallery">
        <img src="@/assets/images/1028-400x400.jpg" alt="a forest after an apocalypse">
        <img src="@/assets/images/15-400x400.jpg" alt="a waterfall and many rocks">
        <img src="@/assets/images/1039-400x400.jpg" alt="a house on a mountain">
        <img src="@/assets/images/106-400x400.jpg" alt="sime pink flowers">
        <img src="@/assets/images/136-400x400.jpg" alt="big rocks with some trees">
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
  width: 250px;
  height: 300px;
}

.gallery {
  --n: 1; /* number of rows*/
  --m: 5; /* number of columns */
  --g: 0px;  /* control the gap */
  --f: .8;   /* control the scale factor */

  display: grid;
  gap: var(--g);
  width: 250px;
  height: 300px;
  grid-template-columns: repeat(var(--m),auto);
}

.gallery > img {
  width: 0;
  height: 0;
  min-height: 100%;
  min-width: 100%;
  object-fit: cover;
  cursor: pointer;
  filter: grayscale(80%);
  transition: .35s linear;
}

.gallery img:hover{
  filter: grayscale(0);
  width:  calc(250px*var(--f)/var(--n));
  height: calc(300px*var(--f)/var(--m));
}

</style>
