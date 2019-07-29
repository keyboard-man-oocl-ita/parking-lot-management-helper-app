import Vue from 'vue'
import Vuex from 'vuex'

import { getOrderList } from '@/api/parkAndFetch'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    clerkOrderList: [],
    parkingBoyId: 1,
  },
  mutations: {
    setOrderList(state, list) {
      state.clerkOrderList = list
    }
  },
  actions: {
    async getOrderList({ commit }, id) {
      let result = await getOrderList(id)
      commit('setOrderList', result.data)
    }
  }
})

export default store