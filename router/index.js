import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../src/components/Primary.vue')
  },
  {
    path: '/main',
    component: () => import('../src/components/HelloWorld.vue'),
    children: [
      {
        path: '/home',
        component: () => import('../src/components/Home.vue')
      },
      {
        path: '/car',
        component: () => import('../src/components/Carshare.vue')
      },
      {
        path: '/course',
        component: () => import('../src/components/Course.vue')
      },
      {
        path: '/addcarshare',
        component: () => import('../src/components/Form/AddCarshare.vue')
      },
      {
        path: '/self',
        component: () => import('../src/components/Self.vue')
      }
    ]
  },
  
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})