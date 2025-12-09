import Vue from 'vue'
import AsyncComputed from 'vue-async-computed'
import App from '@/app/App.vue'
import router from '@/app/router/index'
import store from '@/app/store'
import vuetify from '@/app/plugins/vuetify'

Vue.use(AsyncComputed)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount('#app')
