<template>
  <ExperimentsShowCard>
    <template #title>
      Rainbow Border
    </template>
    <template #description>
      <p>This uses 4 linear gradients extended to four colors</p>
      <a href="https://medium.com/frontend-canteen/fantastic-css-border-animation-b02e06828beb">Original</a>
    </template>
    <template #show  class="container">
      <div class="rainbow" />
    </template>
  </ExperimentsShowCard>
</template>

<style scoped lang="scss">
@keyframes rotate {
  100% {
    transform: rotate(1turn);
  }
}

@keyframes opacityChange {
  50% {
    opacity:1;
  }
  100% {
    opacity: .5;
  }
}

@keyframes overflowChange {
  50% {
    overflow: hidden;

  }
  100% {
    overflow: visible;
  }
}

.rainbow {
  margin: 20px 200px 20px 200px;
  position: relative;
  z-index: 0;
  width: 200px;  /* Outer size of the area */
  height: 150px;
  border-radius: 10px;  /* make corners rounded */
/*  overflow: hidden; this hides the exeding part of the rectangles */
  padding: 2rem;
  animation: overflowChange 5s linear infinite;

  &::before {
    content: '';
    position: absolute;
    z-index: -2; /* move the background image to be above the main element */
    left: -50%; /* move the moving background image to the center of the main element */
    top: -50%;
    width: 200%; /* duplicate the size so that it covers the main element as a whole */
    height: 200%;
    background-size: 50% 50%; /* reduce the background size to 50% in x and y so that we can create the background image as 4 gradients */
    background-position: 0 0, 100% 0, 100% 100%, 0 100%; /* position of each of the 4 gradients */
    /* since there are 4 comma separated images, by default, all are placed in the same position, so only one is visible.
    by setting different position( comma separated) for each image we make them all visible
    The element width and height are 200% of the size for the main element, so 100% position is half of the position in reference to the main
    element.
    each gradient below is one image, there are 4 comma separated
    by using the same start and stop color in each gradient we make them look solid */
    background-image: linear-gradient(#399953, #399953), linear-gradient(#fbb300, #fbb300), linear-gradient(#d53e33, #d53e33), linear-gradient(#377af5, #377af5);
    animation: rotate 4s linear infinite;
  }

  &::after {  /* This creates a white element that hides the center of the gradient so the gradient is visible only on the border*/
    content: '';
    position: absolute;
    z-index: -1;
    left: 6px;  /* The white box needs to be placed far from the container border so the conic gradient is visible */
    top: 6px;
    width: calc(100% - 6px - 6px); /* The white box needs to be smaller than the container so that each border is visible */
    height: calc(100% - 6px - 6px);
    background: white; /* background color */
    border-radius: 5px;
    animation: opacityChange 3s infinite alternate; /* this animation allows to see below the white rectangle */
  }
}

</style>
