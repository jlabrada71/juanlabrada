<template>
  <ExperimentsShowCard>
    <template #title>
      Smoke Text Hover
    </template>
    <template #description>
      <p>Nice and simple effect in SCSS using hover, filter and svg animation. </p>
    </template>
    <template #show  class="container">
      <div id="smokyhover">
        Hover
      </div>
      <svg width="0">
        <filter id="filter">
          <feTurbulence id="turbulence" type="fractalNoise" baseFrequency=".03 .03" numOctaves="20" />
          <feDisplacementMap in="SourceGraphic" scale="70" />
        </filter>
      </svg>
    </template>
  </ExperimentsShowCard>
</template>

<script>
export default {
  mounted () {
    const filter = document.querySelector('#turbulence')
    let frames = 1
    const rad = Math.PI / 180

    function freqAnimation () {
      frames += 0.2

      let bfx = 0.03
      let bfy = 0.03

      bfx += 0.005 * Math.cos(frames * rad)
      bfy += 0.005 * Math.sin(frames * rad)

      const bf = bfx.toString() + ' ' + bfy.toString()
      // displacement.setAttributeNS(null, 'scale', frames)
      filter.setAttributeNS(null, 'baseFrequency', bf)
      window.requestAnimationFrame(freqAnimation)
    }
    window.requestAnimationFrame(freqAnimation)
  }
}
</script>

<style scoped lang="scss">

:root {
    --borderColor: #03A9F3;
}
.container {
  width: 450px;
  height: 200px;
}

#smokyhover {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    margin: auto;
    background: linear-gradient(#fff, #999, #ddd, #888);
    background-clip: text;
    color: transparent;
    font-size: 15vmin;
    text-align: center;
    line-height: 4vh;
}

.container:hover {
    filter: url('#filter');
    cursor: pointer;

    #smokyhover {
        animation: blurChange 2s ease-out forwards;
    }
}

@keyframes blurChange {
    100% {
        filter: blur(15px) contrast(200%);
    }
}

</style>
