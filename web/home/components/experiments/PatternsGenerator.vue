<template>
  <ExperimentsShowCard>
    <template #title>
      Pattern Generator
    </template>
    <template #description>
      <p>Nice pattern generator. </p>
      <a href="https://www.magicpattern.design/tools/css-backgrounds">Original</a>
    </template>
    <template #show  class="container">
      <div class="d-flex flex-column">      
        <div class="d-flex justify-space-around">      
          <v-color-picker
            v-model="color"
            hide-swatches
            hide-inputs
      
          ></v-color-picker>
          
        </div>
        <v-slider
            v-model="spacing"
            :min="1"
            :max="10"
            :step="1"
            thumb-label
          >Spacing</v-slider>
        <div class="patterns d-flex flex-wrap">
          <div class="box wavy"></div>
          <div class="box polka"></div>
          <div class="box circles"></div>
          <div class="box paper"></div>
          <div class="box boxes"></div>
          <div class="box linesv"></div>
          <div class="box linesh"></div>
          <div class="box rectangles"></div>
        </div>
      </div>
    </template>
  </ExperimentsShowCard>
</template>
<script setup>
  import { ref, computed } from 'vue'

  const color = ref({ h: 200, s: 1, l: 0.5, a: 1 })  
  const hue = computed(() => Math.floor(color.value.h) )
  const saturation = computed( ()=> color.value.s )
  const lightness = computed(() => color.value.l )
  const opacity = computed(() => color.value.a)
  const spacing = ref(18)
  const spacingCss = computed(() => spacing.value + 'px')

</script>
<style scoped>

.container {
  background-color: #000;
  min-height: 100vh;
  display: grid;
  place-items: center;
}

.box {
  height: 100px;
  width: 100px;
}

.wavy {
  --opacity: v-bind(opacity);
  --final-color: hsl(v-bind(hue),100%,50%);
  --spacing: v-bind(spacingCss);
  
  background-color: #ffffff;
  opacity: var(--opacity);
  background-image:  repeating-radial-gradient( circle at 0 0, transparent 0, #ffffff var(--spacing) ), repeating-linear-gradient( #130cf755, var(--final-color) );
}

.boxes {
  --opacity: v-bind(opacity);
  --final-color: hsl(v-bind(hue),100%,50%);
  --spacing: v-bind(spacingCss);
  --size: calc(0.4px* var(--spacing));
  --box-spacing: calc(4*var(--spacing));
  --line-thickness: calc(0.4 * var(--spacing));

  background-color: #ffffff;
  opacity: var(--opacity);

  background-image:  linear-gradient(var(--final-color) var(--line-thickness), transparent var(--line-thickness)), linear-gradient(to right, var(--final-color) var(--line-thickness), #ffffff var(--line-thickness)); 
  background-size: var(--box-spacing) var(--box-spacing); 

  background-repeat: repeat;
}

.polka {
  --opacity: v-bind(opacity);
  --final-color: hsl(v-bind(hue),100%,50%);
  --spacing: v-bind(spacingCss);
  --box-spacing: calc(4*var(--spacing));
  --line-thickness: calc(0.2 * var(--spacing));

  background-color: #ffffff;
  opacity: var(--opacity);
  background-image: radial-gradient(var(--final-color) var(--line-thickness), #ffffff var(--line-thickness));
  background-size: var(--box-spacing) var(--box-spacing);
  background-repeat: repeat;

}

.circles {
  --opacity: v-bind(opacity);
  --final-color: hsl(v-bind(hue),100%,50%);
  --spacing: v-bind(spacingCss);
  --radius: calc(4*var(--spacing));
  --big-radius: calc(8*var(--spacing));

  background-color: #ffffff;
  opacity: var(--opacity);
  background-image: radial-gradient(circle at center center, var(--final-color), #ffffff), repeating-radial-gradient(circle at center center, var(--final-color), var(--final-color), var(--radius), transparent var(--big-radius), transparent var(--radius));
  background-blend-mode: multiply;
}

.paper {
  --opacity: v-bind(opacity);
  --final-color: hsl(v-bind(hue),100%,50%);
  --spacing: v-bind(spacingCss);
  --box-spacing: calc(4*var(--spacing));
  --bold-line-thickness: calc(0.8 * var(--spacing));
  --line-thickness: calc(0.4 * var(--spacing));


  background-color: #ffffff;
  opacity: var(--opacity);
  background-image:   linear-gradient(var(--final-color) var(--bold-line-thickness), transparent var(--bold-line-thickness)), 
                      linear-gradient(90deg, var(--final-color) var(--bold-line-thickness), transparent var(--bold-line-thickness)), 
                      linear-gradient(var(--final-color) var(--line-thickness), transparent var(--line-thickness)), 
                      linear-gradient(90deg, var(--final-color) var(--line-thickness), #ffffff var(--line-thickness));

  background-position: -var(--bold-line-thickness) -var(--bold-line-thickness),
                       -var(--bold-line-thickness) -var(--bold-line-thickness),
                       -var(--line-thickness) -var(--line-thickness),
                       -var(--line-thickness) -var(--line-thickness);
  background-repeat: repeat;

  background-size:  calc(20*var(--spacing)) calc(20*var(--spacing)),
                    calc(20*var(--spacing)) calc(20*var(--spacing)), 
                    calc(4*var(--spacing)) calc(4*var(--spacing)),
                    calc(4*var(--spacing)) calc(4*var(--spacing));

}

.linesh {
  --opacity: v-bind(opacity);
  --final-color: hsl(v-bind(hue),100%,50%);
  --spacing: v-bind(spacingCss);
  --box-spacing: calc(4*var(--spacing));
  --line-thickness: calc(0.4 * var(--spacing));

  background-color: #ffffff;
  opacity: var(--opacity);
  background-size: var(--box-spacing) var(--box-spacing);
  background-image:  repeating-linear-gradient(0deg, var(--final-color), var(--final-color) var(--line-thickness), #ffffff var(--line-thickness), #ffffff);
  background-repeat: repeat;
}

.linesv {
  --opacity: v-bind(opacity);
  --final-color: hsl(v-bind(hue),100%,50%);
  --spacing: v-bind(spacingCss);
  --box-spacing: calc(4*var(--spacing));
  --line-thickness: calc(0.4 * var(--spacing));

  background-color: #ffffff;
  opacity: var(--opacity);
  background-image:  repeating-linear-gradient(to right, var(--final-color), var(--final-color) var(--line-thickness), #ffffff var(--line-thickness), #ffffff);
  background-size: var(--box-spacing) var(--box-spacing);
  background-repeat: repeat;
}

.rectangles {
  --opacity: v-bind(opacity);
  --final-color: hsl(v-bind(hue),100%,50%);
  --spacing: v-bind(spacingCss);
  --box-spacing: calc(4*var(--spacing));
  --line-thickness: calc(0.4 * var(--spacing));

  background-color: #ffffff;
  opacity: var(--opacity);
  background-image:  repeating-linear-gradient(45deg, var(--final-color) 25%, transparent 25%, transparent 75%, var(--final-color) 75%, var(--final-color)), repeating-linear-gradient(45deg, var(--final-color) 25%, #ffffff 25%, #ffffff 75%, var(--final-color) 75%, var(--final-color));
  background-position: 0 0, calc(var(--box-spacing)/2)  calc(var(--box-spacing)/2);
  background-size: var(--box-spacing) var(--box-spacing);
  background-repeat: repeat;
}

</style>