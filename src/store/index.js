import Vue from 'vue'
import Vuex from './carlvuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counter: 1
  },
  mutations: {
    // state从何而来
    add(state) {
      state.counter++
    }
  },
  actions: {
    add(ctx) {
      setTimeout(() => {
        ctx.commit('add')
      }, 1000);
    }
  },
  modules: {
  }
})
