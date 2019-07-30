import Vue from 'vue'
import Vuex from 'vuex'

import { getOrderList } from '@/api/parkAndFetch'
import { fetchHistoryOrdersByParkingBoyId } from '@/api/history'
import { fetchUserOrder } from "@/api/userOrder"

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    clerkOrderList: [],
    parkingBoyId: "6f16388d-98eb-41ef-ba14-b5358678a5ca",
    userId: '',
    orderHistory: [],
    operatedOrder: {},
    parkCar: true,
    userOrder: []
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
    },
    setUserOrder( state, list){
      state.userOrder = list
    }
  },
  actions: {
    async getOrderList({ commit }) {
      let result = await getOrderList()
      commit('setOrderList', result.data)
    },
    async fetchOrderHistory({ commit }, payload) {
      let result = await fetchHistoryOrdersByParkingBoyId(payload.status)
      commit('setHistoryOrder', result.data)
    },
    async fetchUserOrderHistory({ commit }, id){
      let result = await fetchUserOrder(id)
      commit('setUserOrder', result.data)
    },
    setParkCar({ commit }){
      commit('setParkCar')
    }
  }
})

export default store