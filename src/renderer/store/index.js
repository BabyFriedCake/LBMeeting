import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import getters from './getters'
import app from './modules/app'
import { createPersistedState, createSharedMutations } from 'vuex-electron'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    app
  },
  getters,
  plugins: [
    createPersistedState(),
    createSharedMutations()
  ],
  strict: process.env.NODE_ENV !== 'production'
})
