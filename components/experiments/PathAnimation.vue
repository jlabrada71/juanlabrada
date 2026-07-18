<template>
  <ShowCard>
    <template #title>
      Path Animation
    </template>
    <template #description>
      <p>The cyclist is animated using the offset-path css property. </p>
      <a target="_blank" href="https://codepen.io/Chokcoco/pen/dyNaZea">Original</a>
    </template>
    <template #show  class="container">
      <div class="wrapper">
        <svg class="cyclist" width="24" height="24" viewBox="0 0 24 24">
          <path d="M5,20.5A3.5,3.5 0 0,1 1.5,17A3.5,3.5 0 0,1 5,13.5A3.5,3.5 0 0,1 8.5,17A3.5,3.5 0 0,1 5,20.5M5,12A5,5 0 0,0 0,17A5,5 0 0,0 5,22A5,5 0 0,0 10,17A5,5 0 0,0 5,12M14.8,10H19V8.2H15.8L13.86,4.93C13.57,4.43 13,4.1 12.4,4.1C11.93,4.1 11.5,4.29 11.2,4.6L7.5,8.29C7.19,8.6 7,9 7,9.5C7,10.13 7.33,10.66 7.85,10.97L11.2,13V18H13V11.5L10.75,9.85L13.07,7.5M19,20.5A3.5,3.5 0 0,1 15.5,17A3.5,3.5 0 0,1 19,13.5A3.5,3.5 0 0,1 22.5,17A3.5,3.5 0 0,1 19,20.5M19,12A5,5 0 0,0 14,17A5,5 0 0,0 19,22A5,5 0 0,0 24,17A5,5 0 0,0 19,12M16,4.8C17,4.8 17.8,4 17.8,3C17.8,2 17,1.2 16,1.2C15,1.2 14.2,2 14.2,3C14.2,4 15,4.8 16,4.8Z" />
        </svg>
        <svg
          class="hill"
          width="942"
          height="343"
          viewBox="0 0 942 343"
          fill="#000"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M129.069 240.15C101.054 252.632 64.034 259.999 0 259V343H942V0C923.49 108.841 845.949 228.167 801.425 268.608C781.416 286.783 743.395 307.552 666.854 257.125C590.313 206.699 552.793 138.298 478.754 138.798C404.715 139.297 387.206 221.677 341.181 257.125C295.157 292.574 245.13 270.606 210.612 257.125C176.093 243.645 157.083 227.668 129.069 240.15Z" />
        </svg>
      </div>
    </template>
  </ShowCard>
</template>

<style scoped lang="scss">
:root {
}
.container {
  width: 900px;
  height: 400px;
  background-color: white;
  display: flex;
}

.wrapper {
  position: relative;
  margin: auto;
}

.cyclist {
  width: 48px;
  height: 48px;
  position: absolute;
  transform: translateY(-50%);  // position the rider above the curve. could be done with offset-position but it has no browser support yet
  offset-path: path("M1 260C65.034 260.999 102.054 253.632 130.069 241.15C158.083 228.668 177.093 244.645 211.612 258.125C246.13 271.606 296.157 293.574 342.181 258.125C388.206 222.677 405.715 140.297 479.754 139.798C553.793 139.298 591.313 207.699 667.854 258.125C744.395 308.552 782.416 287.783 802.425 269.608C846.949 229.167 924.49 109.841 943 1");
  animation: ride-hills 10s ease-in infinite;
}

@keyframes ride-hills {
  to {
    offset-distance: 100%;
  }
}

</style>
