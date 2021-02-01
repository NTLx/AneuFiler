/*
 * @Author: Letmeouted
 * @Email: 1002726239@qq.com
 * @FilePath: \AneuFilerVue\src\renderer\store\index.js
 */

import Vue from 'vue'
import Vuex from 'vuex'

import { createPersistedState, createSharedMutations } from 'vuex-electron'

import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  state: {
    Encoding: 'GBK'
  },
  plugins: [
    createPersistedState(),
    createSharedMutations()
  ],
  strict: process.env.NODE_ENV !== 'production'
})
