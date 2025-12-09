<template>
  <div id="card">
    <slot name="title" />
    <slot name="description" />
    <div class="panel">
      <slot name="show" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'ExperimentCard'
}
</script>

<style scoped lang="scss">
#card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
}

p {
  max-width: 50rem;
  margin-top: 10px;
  text-align: left;
}

.panel {
  display: flex;
  align-items: center;
  position: relative;
  margin-top: 10px;
  overflow: hidden;
}

*, *::before, *::after {
  box-sizing: border-box;
}

</style>
