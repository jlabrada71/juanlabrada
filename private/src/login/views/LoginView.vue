<template>
 <div class="login">
    <LoginForm
      v-on:validate-login="validateLogin"
     />
  </div>

</template>
<script>
import Logger from '@/lib/logger'
import LoginForm from '@/login/components/LoginForm.vue'

export default {
  name: 'LoginView',

  components: {
    LoginForm
  },

  data: () => ({
    isVisibleLoginForm: false
  }),
  methods: {
    validateLogin () {
      Logger.debug(this.$route, 'Login View')
      // re-route to the desired page
      if (this.$route.query.redirect != null) {
        Logger.debug(`redirecting to ${this.$route.query.redirect}`, 'Login View')
        this.$router.push(this.$route.query.redirect)
      } else {
        Logger.debug('redirecting to admin', 'Login View')
        this.$router.push('/admin')
      }
    },

    showLoginForm () {
      this.isVisibleLoginForm = true
    }
  }
}

</script>
<style>
</style>
