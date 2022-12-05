import SignIn from '@/components/User/SignIn.vue'
import SignUp from '@/components/User/SignUp.vue'
import UserInfo from '@/components/User/UserInfo.vue'
import Home from '@/components/Home/Home.vue'
import Order_Main from '@/components/Order/Order_Main.vue'

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
  {
    path: "/user/signup",
    name: 'SignUp',
    component: SignUp,
  },
  {
    path: "/user/info",
    name: 'UserInfo',
    component: UserInfo,
  },
  {
    path: "/order/:PageName",
    name: 'Order_Main',
    component: Order_Main,
  },
]

const router = createRouter({
  history: createWebHistory(),
  // history: createWebHashHistory(),
  routes,
})

export default router
