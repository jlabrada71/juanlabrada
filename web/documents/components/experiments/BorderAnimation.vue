<template>
  <ExperimentsShowCard>
    <template #title>
      Border Animation
    </template>
    <template #description>
      <p>Nice and simple effect in SCSS using hover, before and after directives. </p>
      <a target="_blank" href="https://medium.com/frontend-canteen/fantastic-css-border-animation-b02e06828beb">Original</a>
    </template>
    <template #show  class="container">
      <div id="button" />
    </template>
  </ExperimentsShowCard>
</template>

<style scoped lang="scss">

:root {
    --borderColor: #03A9F3;
}

#button {
    position: relative;
    width: 140px;
    height: 64px;
    margin: 10px;
    border: 1px solid #03A9F3;
    cursor: pointer;

    &::before,
    &::after {
        content: "";
        position: absolute;
        width: 20px;
        height: 20px;
        transition: .3s ease-in-out;
    }

    &::before {
        top: -5px;
        left: -5px;
        border-top: 1px solid #03A9F3;
        border-left: 1px solid #03A9F3;
    }

    &::after {
        right: -5px;
        bottom: -5px;
        border-bottom: 1px solid #03A9F3;
        border-right: 1px solid #03A9F3;
    }

    &:hover::before,
    &:hover::after {
        width: calc(100% + 9px);
        height: calc(100% + 9px);
    }
}

</style>
