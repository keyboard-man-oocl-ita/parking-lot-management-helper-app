import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Example from '../views/example/index'

import grabOrder from '../components/grabOrder/index'
import chooseParkingLot from '../components/chooseParkingLot/index'

import parkAndFetch from '../components/parkAndFetch/index'

import history from '../components/history/index'

import personal from '../components/personal/index'

import login from '../components/login/index'

import register from '../components/register/index'

const router = [
  {
    path: '/',
    name: 'Example',
    component: Example,
    children: [
      //  第一个页面子组件
      {
        path: '/grabOrder',
        name: 'grabOrder',
        component: grabOrder
      },
      {
        path: '/chooseParkingLot',
        name: 'chooseParkingLot',
        component: chooseParkingLot

      },
      //  第二个页面
      {
        path: '/parkAndFetch',
        name: 'parkAndFetch',
        component: parkAndFetch
      },
      //  第三个页面
      {
        path: '/history',
        name: 'history',
        component: history
      },
      //  第四个页面
      {
        path: '/personal',
        name: 'personal',
        component: personal
      },
    ]
  },
  {
    path: '/register',
    name: 'register',
    component: register
  },
  {
    path: '/login',
    name: 'login',
    component: login
  }
]

export default new Router({
  routes: router
})
