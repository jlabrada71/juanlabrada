<template>
  <ExperimentsShowCard>
    <template #title>
      Text Animation
    </template>
    <template #description>
      <p>
        This animation makes use of blur and letter spacing.
      </p>
      <a target="_blank" href="https://codepen.io/Chokcoco/pen/dyRQEKQ">Original</a>
    </template>
    <template #show  class="container">
      <h1 class="tl">
        blur word
      </h1>
    </template>
  </ExperimentsShowCard>
</template>

<style scoped lang="scss">
@import url(https://fonts.googleapis.com/css?family=Righteous);

* {
    box-sizing: border-box;
}

.container {
    width: 700px;
    height: 200px;
    position: relative;
    padding: 0em;
    filter: contrast(20);
    background-color: black;
    overflow: hidden;
}

.tl {
    font-family: Righteous;
    color: white;
    font-size: 2rem;
    text-transform: uppercase;
    line-height: 1;
    animation: letterspacing 5s infinite alternate ease-in-out;
    display: block;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
    letter-spacing: -2.2rem;
}

@keyframes letterspacing {
    0% {
        letter-spacing: -1.2rem;
        filter: blur(.3rem);
    }

    50% {
        filter: blur(.5rem);
    }

    100% {
        letter-spacing: .5rem;
        filter: blur(0rem);
        color: #fff;
    }
}
</style>
