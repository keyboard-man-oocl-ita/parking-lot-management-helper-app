import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Example from '../views/example/index'

import grabOrder from '../components/grabOrder/index'
import parkAndFetch from '../components/parkAndFetch/index'
import history from '../components/history/index'
import personal from '../components/personal/index'

const router = [
  {
    path: '/',
    name: 'Example',
    component: Example,
    children: [
      {
        path: '/grabOrder',
        name: 'grabOrder',
        component: grabOrder
      },
      {
        path: '/parkAndFetch',
        name: 'parkAndFetch',
        component: parkAndFetch
      },
      {
        path: '/history',
        name: 'history',
        component: history
      },
      {
        path: '/personal',
        name: 'personal',
        component: personal
      },
    ]
  }
]

export default new Router({
  routes: router
})
