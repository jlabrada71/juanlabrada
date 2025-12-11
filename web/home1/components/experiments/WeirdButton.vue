<template>
  <ExperimentsShowCard>
    <template #title>
      Weird button
    </template>
    <template #description>
      <p>Solving problem from CSSBattle.com</p>
    </template>
    <template #show  class="container">
      <div id="back">
        <div id="d" />
        <div id="a" />
      </div>
    </template>
  </ExperimentsShowCard>
</template>

<style scoped>
  #back {
    background: #6592CF;
    height: 250px;
    width: 370px;
    font-size: 42px;
    margin: 0.5em;
  }
  #a {
    position: relative;
    top: -1.17em;
    left: 3.97em;
    width: 1.19em;
    height: 1.19em;
    border-radius: 50%;
    background: #EEB850;
    box-shadow: 0 0 0 50px #243D83,
    0 0 0 100px #6592CF;
  }

  #d {
    position: relative;
    top: 1.16em;
    left: 1em;
    width: 7.14em;
    height: 3.56em;
    background: #243D83;
  }
</style>
