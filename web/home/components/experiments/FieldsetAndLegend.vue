<template>
  <ExperimentsShowCard>
    <template #title>
      Fieldset and Legend
    </template>
    <template #description>
      <p>This experiment uses relative unknown html tags 'fieldset' and 'legend' to pull off the effect of the text on the border.</p>
      <a target="_blank" href="https://medium.com/frontend-canteen/the-magical-use-of-uncommon-labels-fieldset-and-legend-d3b29df4fb14">Original</a>
    </template>
    <template #show  class="container">
      <fieldset><legend>CSS fieldset</legend></fieldset>
      <fieldset><legend>HTML element</legend></fieldset>
      <fieldset><legend>JavaScript</legend></fieldset>
      <fieldset><legend>TypeScript</legend></fieldset>
    </template>
  </ExperimentsShowCard>
</template>
<style scoped>
.container {
  width: 300px;
  height: 300px;
}

fieldset{
  position: absolute;
  top: 0;
  left: 0;
  width: 300px;
  height: 300px;
  border: 15px solid transparent;
  border-top-color: white;
  box-sizing: border-box;
}

legend{
  font-family: 'Averia Serif Libre';
  font-size: 24px;
  line-height: 10px;
  font-weight: bold;
  margin-left: 0px;
  padding: 0 10px;
  animation: move 3s infinite linear alternate;
}

fieldset:nth-of-type(2){ transform: rotate(90deg); }
fieldset:nth-of-type(3){ transform: rotate(180deg); }
fieldset:nth-of-type(3)>legend{ transform: rotate(180deg); }
fieldset:nth-of-type(4){ transform: rotate(-90deg); }

@keyframes move {
  100% {
    margin-left: 70px;
  }
}

</style>
