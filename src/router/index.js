import SignIn from '@/components/User/SignIn.vue'
import Home from '@/components/Home/Home.vue'

import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: "/",
    name: 'Home',
    component: Home,
  },
  {
    path: "/user/signin",
    name: 'SignIn',
    component: SignIn,
  },
]

const router = createRouter({
  history: createWebHistory(),
  // history: createWebHashHistory(),
  routes,
})

export default router
