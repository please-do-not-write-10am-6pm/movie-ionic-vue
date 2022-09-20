import { createRouter, createWebHistory } from '@ionic/vue-router'
import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/movie/:id',
    component: () => import('../views/MovieDetails.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
