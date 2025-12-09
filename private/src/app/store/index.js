import Vue from 'vue'
import Vuex from 'vuex'
import Logger from '@/lib/logger'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogged: false
  },
  mutations: {
    setIsLogged: (state, isLogged) => {
      Logger.debug('mutating user', 'store')
      state.isLogged = isLogged
    }
  },
  actions: {
    setIsLogged: (context, isLogged) => {
      Logger.debug('setting isLogged', 'store')
      context.commit('setIsLogged', isLogged)
    },
    setInitialIsLogged: (context) => {
      Logger.debug('setting isLogged', 'store')
      context.commit('setIsLogged', !!localStorage.getItem('accessToken'))
    }
  },
  getters: {
    isLogged: (state) => state.isLogged
  },
  modules: {
  }
})
