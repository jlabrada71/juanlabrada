<template>
  <div class=" bg-[url(/images/20230725_155258.jpg)] bg-cover flex flex-col justify-center align-items-center  p-10 bg-slate-200 w-full h-screen">

    <div class=" flex-col  bg-unset gap-5 flex justify-center">
      <div class="hidden gap-5 p-5 lg:flex flex-row flex-wrap justify-start bg-unset">
        <SquaredButton title="Experience" url="#experiences"></SquaredButton>
        <SquaredButton title="Products" url="#products"></SquaredButton>
        <SquaredButton title="Experiments" url="#experiments"></SquaredButton>
        <SquaredButton title="Posts" url="#posts"></SquaredButton>
        <SquaredButton title="Contact" url="#contact"></SquaredButton>
      </div>
      <JuanImage></JuanImage>
      
      <QuoteWindow></QuoteWindow>
      
    </div>
  </div>
</template>
<script setup>
const props = defineProps({

})
const emit = defineEmits([])
</script>
<style scoped>

</style>