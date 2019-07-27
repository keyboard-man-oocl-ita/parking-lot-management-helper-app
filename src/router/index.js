import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Example from '../views/example/index'

const router = [
  {
    path: '/',
    name: 'Example',
    component: Example
  }
]

export default new Router({
  routes: router
})
