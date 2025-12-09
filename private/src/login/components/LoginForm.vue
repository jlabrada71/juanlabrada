<template>
<div>
  <div id="login-form">
    <v-container>
      <v-card class="c-login-form" v-show="showLoginForm">
        <v-card-title class="subheading">Login</v-card-title>
        <v-form class="px-8">
          <v-text-field id='email' label="email" v-model="user.username"></v-text-field>
          <v-text-field id='password' label="password"
                          v-model="user.password"
                          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                          :rules="[rules.required, rules.min]"
                          :type="showPassword ? 'text' : 'password'"
                          counter
                          @click:append="showPassword = !showPassword"
            ></v-text-field>
          <span class="red--text">{{errorMsg}}</span>

        </v-form>
      <v-card-actions class="c-login-form-actions">
        <v-btn class="success"
                block
                @click="loginUser"
                v-show="!waitingForServer">Login</v-btn>
        <v-btn block
                color="white"
                text
                :ripple="false"
                elevation="0"
              v-show="waitingForServer" >
          <v-progress-circular
            block
            indeterminate
            color="primary"
            v-show="waitingForServer">
          </v-progress-circular>
        </v-btn>
      </v-card-actions>
    </v-card>
   </v-container>
  </div>
</div>

</template>
<script>
import ApiRequest from '@/lib/api-request'
import Logger from '@/lib/logger'

export default {
  name: 'LoginForm',
  data: () => ({
    user: { username: '', password: '' },
    showLoginForm: true,
    valid: false,
    showPassword: false,
    loginUrl: `${process.env.VUE_APP_API_SERVER}/api/v1/authentication`,
    rules: {
      required: (value) => !!value || 'Required.',
      min: (v) => v.length >= 8 || 'Min 8 characters',
      emailMatch: () => ('The email and password you entered don\'t match')
    },
    waitingForServer: false,
    errorMsg: ' '
  }),
  mounted () {
    this.logingUrl = `${process.env.VUE_APP_API_SERVER}/api/v1/authentication`
  },
  methods: {
    async loginUser () {
      if (this.user.username.trim() === '') {
        this.errorMsg = 'Missing username'
        return
      }
      if (this.user.password.trim() === '') {
        this.errorMsg = 'Missing password'
        return
      }

      this.errorMsg = ' '
      this.waitingForServer = true
      const form = { user: this.user }
      Logger.debug(JSON.stringify(form, null, 2), 'Login form')
      const response = await ApiRequest.post(this.loginUrl, form).catch((error) => {
        this.waitingForServer = false
        Logger.debug(error, 'Login form')
        if (!error.response) {
          this.errorMsg = error
        } else if (error.response.status === 404) {
          this.errorMsg = 'Invalid username or password'
        } else {
          this.errorMsg = `Error ${error.response.status}: ${error.response.statusText}`
        }
      })
      this.waitingForServer = false
      if (!response) return
      localStorage.setItem('accessToken', response.data.accessToken)
      localStorage.setItem('refreshToken', response.data.refreshToken)
      localStorage.setItem('userId', response.data.userId)
      this.$store.dispatch('setIsLogged', true)
      Logger.debug('component route params', 'Login form')
      response.data.password = ''
      this.hideLoginDialog(response.status >= 200 && response.status < 300)
      this.$emit('validate-login')
    },
    hideLoginDialog (shouldHide) {
      this.showLoginForm = !shouldHide
    },
    cancel () {
      this.$emit('cancel-login')
    }
  }
}

</script>
<style>
</style>
