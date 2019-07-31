import Vue from 'vue'
import Vuex from 'vuex'

import { getOrderList } from '@/api/parkAndFetch'
import { fetchHistoryOrdersByParkingBoyId } from '@/api/history'
import { fetchUserOrder } from "@/api/userOrder"

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    clerkOrderList: [],
    parkingBoyId: "",
    currentUser: '',
    orderHistory: [],
    operatedOrder: {},
    parkCar: true,
    userOrder: [],
    curOrder: ''
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
    },
    setCurOrder( state, data ){
      state.curOrder = data
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
    async fetchUserOrderHistory({ commit }){
      let result = await fetchUserOrder()
      commit('setUserOrder', result.data)
    },
    setParkCar({ commit }){
      commit('setParkCar')
    },
    setCurOrder({ commit }, data){
      commit('setCurOrder', data)
    }
  }
})

export default store