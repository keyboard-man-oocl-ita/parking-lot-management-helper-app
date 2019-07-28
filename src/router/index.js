import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = [
  {
    path: '/',
    name: 'Example',
    component: () => import('@/components/example/index'),
    children: [
      //  第一个页面子组件
      {
        path: '/grabOrder',
        name: 'grabOrder',
        component: () => import('@/components/grabOrder/index')
      },
      {
        path: '/chooseParkingLot',
        name: 'chooseParkingLot',
        component: () => import('@/components/chooseParkingLot/index')
      },
      //  第二个页面
      {
        path: '/parkAndFetch',
        name: 'parkAndFetch',
        component: () => import('@/components/parkAndFetch/index')
      },
      //  第三个页面
      {
        path: '/history',
        name: 'history',
        component: () => import('@/components/history/index')
      },
      {
        path: '/details',
        name: 'details',
        component: () => import('@/components/historyDetails/index')
      },
      //  第四个页面
      {
        path: '/personal',
        name: 'personal',
        component: () => import('@/components/personal/index')
      },
    ]
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/components/register/index')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/components/login/index')
  }
]

export default new Router({
  routes: router
})
