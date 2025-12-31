<template>
  <ShowCard>
    <template #title>
      Yellow Tears
    </template>
    <template #description>
      <p>Solving problem from CSSBattle.com</p>
    </template>
    <template #show  class="container">
      <div id="back">
        <div d />
        <div id="a" d />
        <div id="b" d />
      </div>
    </template>
  </ShowCard>
</template>

<style scoped>
#back {
  background: #0B2429;
  font-size: 120px;
  position: relative;
  margin: 10px 6.5px;
  width: 350px;
  height: 350px;
}

div[d] {
  position: absolute;
  left: 1.5em;
  top: 0.5em;
  width: 1em;
  height: 1em;
  background: #F3AC3C;
  border-radius: 50%
}
#a, #b {
  border-radius: 50% 0 50% 50%
}
#a {
  left: 1em;
  top: 1em;
  background: #998235;
}
#b {
  left: 0.5em;
  top: 1.5em;
}
</style>
