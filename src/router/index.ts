import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    redirect: '/dashboard/home',
    component: () => import('@/views/dashboard/index.vue'),
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/tabbar/home/index.vue')
    }, {
      path: 'shop',
      name: 'shop',
      component: () => import('@/views/tabbar/shop/index.vue')
    }, {
      path: 'cart',
      name: 'cart',
      component: () => import('@/views/tabbar/cart/index.vue')
    }, {
      path: 'mine',
      name: 'mine',
      component: () => import('@/views/tabbar/mine/index.vue')
    }]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
