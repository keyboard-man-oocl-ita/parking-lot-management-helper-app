import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = [
  {
    path: '/',
    name: 'Example',
    redirect:'/login',
    component: () => import('@/components/example/index'),
    children: [
      // 第一个页面Tab
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
      // 第二个页面Tab
      {
        path: '/parkAndFetch',
        name: 'parkAndFetch',
        component: () => import('@/components/parkAndFetch/index')
      },
      // 第三个页面Tab
      {
        path: '/history',
        name: 'history',
        component: () => import('@/components/history/index'),
      },
      {
        path: '/history/:id',
        name: 'details',
        component: () => import('@/components/historyDetails/index')
      },
      // 第四个页面Tab
      {
        path: '/personal',
        name: 'personal',
        component: () => import('@/components/personal/index')
      },
    ]
  },
  // 登录注册route
  {
    path: '/register',
    name: 'register',
    component: () => import('@/components/register/index')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/components/login/index')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('@/components/user/index'),
    children: [{
      path: '/parkCar',
      name: 'parkCar',
      component: () => import('@/components/parkCar/index')
    },
    {
      path: '/userProfile',
      name: 'userProfile',
      component: () => import('@/components/userProfile/index')
    },
    {
      path: '/userOrder',
      name: 'userOrder',
      component: () => import('@/components/userOrder/index')
    }]
  }
];

export default new Router({
  routes: router
})
