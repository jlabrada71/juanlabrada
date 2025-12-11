<template>
  <div>
    <h3 class="juanlabrada">
      Juan R Labrada
    </h3>
  </div>
</template>
<script setup>
  const props = defineProps({
    height: {
      type: String,
      default: '1.5rem'
    }
  })

</script>

<style>
@font-face {
  font-family: "WindSong";
  font-weight: 500;
  font-style: normal;
  font-display: auto;
  unicode-range: U+000-5FF;
  src: local("WindSong"), url("@/assets/fonts/WindSong/WindSong-Medium.ttf") format("ttf");
}

.juanlabrada {
  font-family: 'WindSong', cursive;
  font-size: v-bind(props.height);
  color: white;
}
</style>
