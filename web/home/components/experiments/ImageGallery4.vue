<template>
  <ExperimentsShowCard>
    <!-- <template #title>
      Image Gallery
    </template>
    <template #description>
      <p>Changing the image width on hover within a grid. </p>
      <a target="_blank" href="https://css-tricks.com/css-grid-and-custom-shapes-part-1/">Original</a>
    </template> -->
    <template #show  class="container w-9/10">
      <div class="gallery">
        <img src="@/assets/images/1028-400x400.jpg" alt="a forest after an apocalypse">
        <img src="@/assets/images/15-400x400.jpg" alt="a waterfall and many rocks">
        <img src="@/assets/images/1039-400x400.jpg" alt="a house on a mountain">
        <img src="@/assets/images/106-400x400.jpg" alt="sime pink flowers">
        <img src="@/assets/images/136-400x400.jpg" alt="big rocks with some trees">
        <img src="@/assets/images/1039-400x400.jpg" alt="a waterfall, a lot of tree and a great view from the sky">
        <img src="@/assets/images/110-400x400.jpg" alt="a cool landscape">
        <img src="@/assets/images/1047-400x400.jpg" alt="inside a town between two big buildings">
        <img src="@/assets/images/1057-400x400.jpg" alt="a great view of the sea above the mountain">
        <img src="@/assets/images/1016-400x400.jpg" alt="a great view of a canyon">
        <img src="@/assets/images/1015-400x400.jpg" alt="a great view of a river between mountains">
        <img src="@/assets/images/1020-400x400.jpg" alt="a wild bear appeared">
      </div>
    </template>
  </ExperimentsShowCard>
</template>

<style scoped>
:root {
    --borderColor: #03A9F3;
}


.gallery {
  --n: 3; /* number of rows*/
  --m: 4; /* number of columns */
  --g: 10px;  /* control the gap */
  --f: 1.2;   /* control the scale factor */

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
