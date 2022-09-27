import { createRouter, createWebHistory } from '@ionic/vue-router'
import { RouteRecordRaw } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import MovieDetails from '../views/MovieDetails.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    component: HomeView,
  },
  {
    path: '/movie/:id',
    component: MovieDetails,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
