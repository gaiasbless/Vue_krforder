import SignIn from '@/components/User/SignIn.vue'
import Home from '@/components/Home/Home.vue'

import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import { LogManager } from '@/utility/LogManager'

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

router.beforeEach((to, from, next) => {
  LogManager.w( 'Router Event', 'beforeEach', '이동경로', to.path )
  next()
});

export default router
