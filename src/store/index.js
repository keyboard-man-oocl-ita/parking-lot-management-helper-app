import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {

    clerkOrderList:[]

  },
  mutations:{
    setOrderList(state,list){
      state.clerkOrderList = list
    }
  },
  actions:{
    getOrderList({commit}){
      axios.get("http://localhost:8080/orders")
          .then(res=>{
            commit('setOrderList',res.data)
          })
          .catch(error=>console.log(error));
    }
  }
})

export default store