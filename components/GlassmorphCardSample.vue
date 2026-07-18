<template>
  <div class="pa-5">
    <GlassmorphCard width="300px" heigh="300px">
    <template v-slot:front>
      <picture>
        <source media="(min-width:300px)" srcset="assets/images/juanlabrada_logo.jpg">
        <source media="(min-width:300px)" srcset="assets/images/juanlabrada_logo.jpg">
        <img width="300"
          cover
          :aspect-ratio="1"
          alt="Juan Agile Scrum"
          src="assets/images/juanlabrada_logo.jpg">
      </picture>
    </template>
    </GlassmorphCard>
  </div>
</template>

