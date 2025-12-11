<template>
  <ExperimentsShowCard>
    <template #title>
      Smoky Text Animation
    </template>
    <template #description>
      <p>
        This smoke effect is based on text shadow blur animation. The text color is transparent and the shadow white. By rotating the text
        and increasing the blur a smoke effect is created. This is increase by making different the animation for characters in even position.
      </p>
      <a href="https://codepen.io/bennettfeely/pen/nZXRyJ">Original</a>
    </template>
    <template #show  class="container">
      <span>E</span><span>X</span><span>P</span><span>E</span><span>R</span><span>I</span><span>M</span><span>E</span><span>N</span><span>T</span>
    </template>
  </ExperimentsShowCard>
</template>

<style scoped lang="scss">

.container {
  padding:0 0 200px 0;
  height: 200px;
  background: black;
  overflow: hidden;
  font: 5vw/25vh "Finger Paint";
  text-align: center;
  color: transparent;
  backface-visibility: hidden;
}

:root {
    --borderColor: #03A9F3;
}

@import url(https://fonts.googleapis.com/css?family=Finger+Paint);

span {
  display: inline-block;
  text-shadow: 0 0 0 whitesmoke;
  animation: smoky 5s 0s both;
  animation-play-state: paused;
}

.container:hover span {
  animation-play-state: running;
}

@keyframes smoky {
  60% {
    text-shadow: 0 0 40px whitesmoke;
  }
  to {
    transform:
      translate3d(15rem,-8rem,0)
      rotate(-40deg)
      skewX(70deg)
      scale(1.5);
    text-shadow: 0 0 20px whitesmoke;
    opacity: 0;
  }
}

span:nth-child(even){
  animation-name: smoky-mirror;
}

@keyframes smoky-mirror {
  60% {
    text-shadow: 0 0 40px whitesmoke; }
  to {
    transform:
      translate3d(18rem,-8rem,0)
      rotate(-40deg)
      skewX(-70deg)
      scale(2);
     text-shadow: 0 0 20px whitesmoke;
    opacity: 0;
  }
}

@for $item from 1 through 21 {
  span:nth-of-type(#{$item}){
    animation-delay: #{(3 + calc($item/10))}s;
  }
}

</style>
