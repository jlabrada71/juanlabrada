<template>
  <v-app id="keep">
    <v-app-bar
          app
          clipped-left
          color="indigo"
          dark
        >
      <span class="title ml-3 mr-5">Juan Labrada&nbsp;
        <span class="font-weight-light">Software Developer</span>
      </span>

      <v-spacer></v-spacer>

      <v-text-field
        solo-inverted
        flat
        hide-details
        label="Search"
        prepend-inner-icon="search"
      ></v-text-field>
      <v-spacer></v-spacer>
       <v-btn
      v-show="!isLogged"
      rounded
      color="primary"
      dark
      to="/login"
    >
      Login
    </v-btn>
      <v-btn
      v-show="isLogged"
      rounded
      color="primary"
      dark
      @click="logout()"
    >
      Logout
    </v-btn>
    </v-app-bar>
    <v-main class="ma-2">
        <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'App',
  components: {
  },
  mounted () {
    this.$store.dispatch('setInitialIsLogged')
  },
  computed: mapState({
    isLogged: (state) => state.isLogged
  }),
  data: () => ({
    collapseOnScroll: true,
    notes: [],
    showDrawer: false,
    items: [
      { icon: 'lightbulb_outline', text: 'Notes' },
      { icon: 'touch_app', text: 'Reminders' },
      { divider: true },
      { heading: 'Labels' },
      { icon: 'add', text: 'Create new label' }
    ]
  }),
  methods: {
    logout () {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('userId')
      this.$store.dispatch('setIsLogged', false)
      this.$router.push('/')
    }
  }
}
</script>
<style lang="sass">
@import '@/app/sass/_base.sass'
@import '@/app/sass/components/customer.sass'
$color: red
$background-color: blue

#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50

#nav
  padding: 30px
  a
    font-weight: bold
    color: #2c3e50
    &.router-link-exact-active
      color: #42b983

#keep .v-navigation-drawer__border
  display: none
</style>
