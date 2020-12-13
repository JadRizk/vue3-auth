import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from 'views/Home.vue'
import Auth from 'views/Auth.vue'

import { store } from 'store';

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      auth: true
    }
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
    meta: {
      auth: false,
    }
  },
  {
    path: '/:catchAll(.*)',
    redirect: "/",
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    if (store.getters.isUserLoggedIn)
      next()

    next({ name: 'Auth' })
  }

  if (!to.meta.auth) {
    if (store.getters.isUserLoggedIn)
      next({ name: 'Home' })

    if (to.name !== 'Auth')
      next({ name: 'Auth' })

    next()
  }
})

export default router
