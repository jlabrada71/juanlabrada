<template>
  <ShowCard>
    <template #title>
      Smoke Text
    </template>
    <template #description>
      <p>Simple effect mixing up SVG and CSS filters. </p>
    </template>
    <template #show  class="container">
      <div id="smokyhover">
        SMOKE
      </div>
      <svg width="0">
        <filter id="filter">
          <feTurbulence id="turbulence" type="fractalNoise" baseFrequency=".03" numOctaves="20" />
          <feDisplacementMap in="SourceGraphic" scale="70" />
        </filter>
      </svg>
    </template>
  </ShowCard>
</template>

<script>
export default {
  mounted () {
    const filter = document.querySelector('#turbulence')
    let frames = 1
    const rad = Math.PI / 180
    let bfx, bfy

    function freqAnimation () {
      frames += 0.2

      bfx = 0.03
      bfy = 0.03

      bfx += 0.005 * Math.cos(frames * rad)
      bfy += 0.005 * Math.sin(frames * rad)

      const bf = bfx.toString() + ' ' + bfy.toString()
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
  /* width: 450px;
  height: 200px; */
  filter: url('#filter');
}

#smokyhover {
  width: 100%;
  height: 100%;
  margin: auto;
  background: linear-gradient(#fff, #999, #ddd, #888);
  background-clip: text;
  color: transparent;
  font-size: 30vmin;
  text-align: center;
  line-height: 100%;
  filter: blur(6px) contrast(120%);
}

@keyframes blurChange {
    100% {
        filter: blur(15px) contrast(200%);
    }
}

</style>
