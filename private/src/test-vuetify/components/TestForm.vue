<template>
  <div id="login-form">
    <h1>Test Pages</h1>
    <p class="red white--text">Lorem, ipsum dolor sit amet consectetur
      adipisicing elit. Recusandae, magnam earum praesentium quod
      blanditiis deleniti in sit ratione beatae impedit consequuntur
      iusto aperiam, officia iure sequi! Minus vitae doloremque facere.</p>
      <p class="pink lighten-4 red--text text--darken-4">Lorem, ipsum dolor sit amet consectetur
      adipisicing elit. Recusandae, magnam earum praesentium quod
      blanditiis deleniti in sit ratione beatae impedit consequuntur
      iusto aperiam, officia iure sequi! Minus vitae doloremque facere.</p>
    <h1 class="display-4">Massive Display</h1>
    <h1 class="display-4 font-weight-bold">Massive Bold Display</h1>
    <h4 class="display-1">Smaller Display</h4>
    <p class="headline">This is a headline</p>
    <p class="subheading">This is a subheading</p>
    <p class="caption">This is a caption</p>
    <p class="text-capitalize">this is a capitalized text</p>
    <p class="text-lowercase">THIS IS A LOWERCASED TEXT</p>
    <p class="text-uppercase">and this is an uppercased text</p>
    <v-card flat class="c-login-form">
      <v-card-title class="c-login-form__title">Login</v-card-title>
      <v-form class="ma-2 px-2 white--text">
          <v-text-field label="email" v-model="user.email"></v-text-field>
          <v-text-field label="password"
                        v-model="user.password"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rules.required, rules.min]"
                        :type="show1 ? 'text' : 'password'"
                        counter
                        @click:append="show1 = !show1"
          ></v-text-field>

      </v-form>
      <v-card-actions class="c-login-form-actions">
        <v-btn class="success" @click="submit">Login</v-btn>
        <v-btn class="cancel" @click="cancel">Cancel</v-btn>
      </v-card-actions>
    </v-card>
    <v-container class="my-5">
      <v-layout row wrap>
        <v-flex xs12 md6>
          <v-btn block outlined  >block button</v-btn>
        </v-flex>
        <v-flex xs12 md6>
          <v-btn outlined  >non block button</v-btn>
        </v-flex>
      </v-layout>

    </v-container>
  </div>
</template>
<script>
export default {
  name: 'LoginForm',
  data: () => ({
    user: { email: '', password: '' },
    valid: false,
    show1: false,
    password: 'Password',
    rules: {
      required: (value) => !!value || 'Required.',
      min: (v) => v.length >= 8 || 'Min 8 characters',
      emailMatch: () => ('The email and password you entered don\'t match')
    }
  }),
  methods: {
    submit () {
      this.$emit('validate-login', this.loginUser)
    },
    cancel () {
      this.$emit('cancel-login')
    }
  }
}

</script>
<style>
c-login-form {

}

c-login-form__title {

}

c-login-form-actions {

}
</style>
