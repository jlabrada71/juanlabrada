<template>
  <ShowCard>
    <template #title>
      Multi Word Animation
    </template>
    <template #description>
      <p>Simple effect mixing up contrast and blur filters. </p>
    </template>
    <template #show  class="container">
      <div class="word">
        Senior
      </div>
      <div class="word">
        Software
      </div>
      <div class="word">
        Dev
      </div>
      <div class="word">
        Labrada
      </div>
    </template>
  </ShowCard>
</template>

<style scoped lang="scss">
:root {
    --borderColor: #03A9F3;
}

@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

$speed: 8s;
$wordCount: 4;

.container {
  width: 500px;
  height: 200px;
  position: relative;
  background: #000;
  font-family: 'Montserrat', sans-serif;
  color: #fff;
  font-size: 100px;
  filter: contrast(15);
}

.word {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: change $speed infinite ease-in-out;

  @for $i from 0 to $wordCount {
    &:nth-child(#{$i + 1}) {
      animation-delay: (calc($speed / calc($wordCount + 1) * $i)) - $speed;
    }
  }
}

@keyframes change {
  0%,
  5%,
  100% {
    filter: blur(0px);
    opacity: 1;
  }
  50%,
  80% {
    filter: blur(80px);
    opacity: 0;
  }
}
</style>
