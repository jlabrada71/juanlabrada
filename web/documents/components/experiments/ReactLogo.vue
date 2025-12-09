<template>
  <ExperimentsShowCard>
    <template #title>
      React Logo Animated
    </template>
    <template #description>
      <p>React logo implemented in CSS. </p>
      
    </template>
    <template #show  class="container">
      <div class="logo">
        <div class="ball"></div>
        <div class="ellipse ellipse1"></div>
        <div class="ellipse ellipse2"></div>
        <div class="ellipse ellipse3"></div>
      </div>
    </template>
  </ExperimentsShowCard>
</template>

<style scoped>
  h1 {
    margin:2ch;
  }
  .container {
    padding: 0;
    margin: 0;
    height: 60vh;
    display:flex;
    justify-content: center;
    align-items: center;
    background-color: azure;
  }

  .logo {
    height: 40vh;
    width: 40vh;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: roll 15s linear 0.5s infinite;
    background-color: azure;
  }

  .ball {
    position:absolute;
    width: 2.5vw;
    height: 2.5vw;
    border-radius: 50%;
    background-color: #5ed3f3;
  }

  .ellipse {
    position:absolute;
    width: 4vw;
    height: 12vw;
    border-radius: 50%;
    border : 0.6vw solid #5ed3f3;
  }

  .ellipse1 {
    transform: rotate(90deg)
  }

  .ellipse2 {
    transform: rotate(30deg)
  }

  .ellipse3 {
    transform: rotate(-30deg)
  }

  @keyframes roll {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

</style>