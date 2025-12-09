<template>
  <ExperimentsShowCard>
    <template #title>
      Overflow animation
    </template>
    <template #description>
      <p>Border animation using Overflow and RotateZ. </p>
      <a href="https://medium.com/frontend-canteen/fantastic-css-border-animation-b02e06828beb">Original</a>
    </template>
    <template #show  class="container">
      <span class="bt">
        Hover me
      </span>
      <span class="bt">
        Hover me
      </span>
    </template>
  </ExperimentsShowCard>
</template>

<style scoped lang="scss">

:root {
  --borderColor: #03A9F3;
}

.container {
  width: 550px;
  height: 300px;
  display: flex;
  background: yellowgreen;
}

span {
    position: relative;
    margin: auto;
    width: 150px;
    height: 80px;
    line-height: 80px;
    text-align: center;
    overflow: hidden;

    &::after {
        content: "Hover Me";
        position: absolute;
        top: 4px;
        bottom: 4px;
        right: 4px;
        left: 4px;
        line-height: 92px;
        font-size: 24px;
        background: #fff;
        border: 2px solid yellowgreen;
        cursor: pointer;
        color: yellowgreen;
    }

    &::before {
        content: "";
        position: absolute;
        top: 0px;
        bottom: 0px;
        right: -20px;
        left: 0px;
        background: #fff;
        //border-radius: 50%;
        transform: rotateZ(-90deg) translate(-100%, -100%);
        transform-origin: top left;
        transition: transform .3s;
        transition-timing-function: linear;
    }

    &:hover {
        filter: contrast(1.2);
    }

        &:hover::before {
            transform: rotateZ(0deg) translate(0%, -0%);
        }
}

span:nth-child(2) {
    overflow: unset;

    &::after {
        content: "";
    }
}

span:nth-child(1):hover ~ span:nth-child(2)::before {
    transform: rotateZ(0deg) translate(0%, -0%);
}

</style>
