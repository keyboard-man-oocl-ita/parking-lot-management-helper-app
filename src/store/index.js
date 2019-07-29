import Vue from 'vue'
import Vuex from 'vuex'

import { getOrderList } from '@/api/parkAndFetch'
import { fetchHistoryOrdersByParkingBoyId } from '@/api/history'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    clerkOrderList: [],
    parkingBoyId: "6f16388d-98eb-41ef-ba14-b5358678a5ca",
    orderHistory: [],
    operatedOrder: {},
    parkCar: true
  },
  mutations: {
    setOrderList(state, list) {
      state.clerkOrderList = list
    },
    setHistoryOrder(state, list){
      state.orderHistory = list
    },
    setParkCar( state ){
      state.parkCar = !state.parkCar
    }
  },
  actions: {
    async getOrderList({ commit }, id) {
      let result = await getOrderList(id)
      commit('setOrderList', result.data)
    },
    async fetchOrderHistory({ commit }, payload) {
      let result = await fetchHistoryOrdersByParkingBoyId(payload.id, payload.status)
      commit('setHistoryOrder', result.data)
    },
    setParkCar({ commit }){
      commit('setParkCar')
    }
  }
})

export default store