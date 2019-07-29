import Vue from 'vue'
import Vuex from 'vuex'

import { getOrderList } from '@/api/parkAndFetch'
import { fetchHistoryOrdersByParkingBoyId } from '@/api/history'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    clerkOrderList: [],
    parkingBoyId: "6f16388d-98eb-41ef-ba14-b5358678a5ca",
    orderHistory: []
  },
  mutations: {
    setOrderList(state, list) {
      state.clerkOrderList = list
    },
    setHistoryOrder(state, list){
      state.orderHistory = list
    }
  },
  actions: {
    async getOrderList({ commit }, id) {
      let result = await getOrderList(id)
      commit('setOrderList', result.data)
    },
    async fetchOrderHistory({ commit }, id) {
      let result = await fetchHistoryOrdersByParkingBoyId(id)
      commit('setHistoryOrder', result.data)
    }
  }
})

export default store