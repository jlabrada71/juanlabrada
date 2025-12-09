<template>
  <div class="home">
    <section class="yo">
      <ComponentLifeCycle />
    </section>
    <section class="notes">
      <h1>Notes</h1>
    </section>
    <section class="projects">
      <h1>Projects</h1>
    </section>
    <section class="products">
      <h1>Products</h1>
      <h3>MabayJS</h3>
      <h3>AprendeComoPirata</h3>
    </section>
    <section class="experiences">
      <h1>Experiences</h1>
      <h3>MonetizeMore</h3>
      <h3>Wplex</h3>
      <h3>Experian</h3>
      <h3>Freelancer</h3>
      <h3>Bicevida</h3>
      <h3>Falabella</h3>
      <h3>Cubacel</h3>
    </section>
    <section class="technologies">
      <h1>Technologies</h1>
      <h3>Javascript</h3>
      <h3>VueJS</h3>
      <h3>NodeJS</h3>
      <h3>MongoDB</h3>
      <h3>PosgressSQL</h3>
      <h3>MySql</h3>
    </section>
    <section class="contact"><h1>Contact</h1></section>
  </div>
</template>

<script>
import ComponentLifeCycle from '@/app/components/ComponentLifeCycle.vue'

export default {
  name: 'HomeView',
  components: {
    ComponentLifeCycle
  },
  methods: {
  }
}
</script>
<style lang="sass">
.yo
  padding: 20px
  height: 300px
  background-color: white
  color: black

.notes
  padding: 20px
  height: 300px
  background-color: olive
  color: white

.projects
  padding: 20px
  height: 300px
  background-color: white

.products
  padding: 20px
  height: 300px
  background-color: red
  color: white

.experiences
  padding: 20px
  height: 300px
  background-color: grey
  color: white

.technologies
  padding: 20px
  height: 300px
  background-color: white
  color: black

.contact
  padding: 20px
  height: 300px
  background-color: black
  color: white

h1
  @extends .ma-3
</style>
