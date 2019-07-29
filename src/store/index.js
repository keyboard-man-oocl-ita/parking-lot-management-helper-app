import Vue from 'vue'
import Vuex from 'vuex'

import { getOrderList } from '@/api/parkAndFetch'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    clerkOrderList: []
  },
  mutations: {
    setOrderList(state, list) {
      state.clerkOrderList = list
    }
  },
  actions: {
    async getOrderList({ commit }) {
      let result = await getOrderList()
      commit('setOrderList', result.data)
    }
  }
})

export default store