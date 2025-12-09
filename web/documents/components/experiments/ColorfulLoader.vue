<template>
  <ExperimentsShowCard>
    <template #title>
      Colorfull Loader
    </template>
    <template #description>
      <p>Nice colorful loader in SCSS. </p>
      
    </template>
    <template #show  class="container">
      <div class="loader">
        <i></i><i></i><i></i><i></i><i></i><i></i>
        <i></i><i></i><i></i><i></i><i></i><i></i>
        <i></i><i></i><i></i><i></i><i></i><i></i>
        <i></i><i></i><i></i><i></i><i></i><i></i>
        <i></i><i></i><i></i><i></i><i></i><i></i>
        <i></i><i></i><i></i><i></i><i></i><i></i>
        <i></i><i></i><i></i><i></i><i></i><i></i>
        <i></i><i></i><i></i><i></i><i></i><i></i>
        <i></i><i></i><i></i><i></i><i></i><i></i>
        <i></i><i></i><i></i><i></i><i></i><i></i>
        <i></i><i></i><i></i><i></i><i></i><i></i>
        <i></i><i></i><i></i><i></i><i></i><i></i>
      </div>
    </template>
  </ExperimentsShowCard>
</template>
<style lang="scss" scoped>

.container {
  background-color: #000;
  min-height: 100vh;
  display: grid;
  place-items: center;
}

$duration: 4s;

.loader {
  position: relative;
  width: 21em; height: 21em;
  background-color: #000;
  filter: blur(0.2em) contrast(2);
  animation: loaderSpin calc($duration*4) infinite linear;
  
  @keyframes loaderSpin {
    to { transform: rotate(360deg); }
  }
  
  & > i {
    position: absolute;
    left: 10em; top: 10em;
    width: 1em; height: 1em;
    background-color: hsl(var(--hue, 0), 75%, 75%);
    border-radius: 50%;
    transform: rotateZ(var(--rz, 0)) translateY(5em);
    animation: iMove $duration var(--delay, 0s) infinite ease-in-out;
        
    @keyframes iMove {
      0% { transform: rotateZ(var(--rz, 0)) translateY(4em) translate(0, 0) scale(0); }
      2% { transform: rotateZ(var(--rz, 0)) translateY(4em) translate(0, 0) scale(1.25); }
      20% { transform: rotateZ(var(--rz, 0)) translateY(4em) translate(0, 0) scale(1.25); }
      90%, 100% { transform: rotateZ(var(--rz, 0)) translateY(4em) translate(var(--tx, 0), var(--ty, 0)) scale(0); }
    }
    
    @for $i from 0 to 72 {
      &:nth-child(#{calc($i + 1)}) {
        --rz: #{calc($i * 5)}deg;
        --delay: #{calc( calc($duration / 72) * $i - $duration)};
        --tx: #{calc(random(1000) / 250)}em;
        --ty: #{calc(random(1000) / 125 - 2.5)}em;
        --hue: #{calc($i * 5)};
      }
    }
  }
}
</style>