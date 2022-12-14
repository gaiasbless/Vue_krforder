import SignIn from '@/components/User/SignIn.vue'
import SignUp from '@/components/User/SignUp.vue'
import UserInfo from '@/components/User/UserInfo.vue'
import Home from '@/components/Home/Home.vue'
import Order_Main from '@/components/Order/Order_Main.vue'
import Order_Register_Modify from '@/components/Order/Order_Register_Modify.vue'
import Order_Register_DirectView from '@/components/Order/Order_Register_DirectView.vue'
import Order_Register_DirectSet from '@/components/Order/Order_Register_DirectSet.vue'
import Logistics_Main from '@/components/Logistics/Logistics_Main.vue'
import Logistics_Store_Detail from '@/components/Logistics/Logistics_Store_Detail.vue'

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
  {
    path: "/order/regmodify/:OrderNumber",
    name: 'Order_Register_Modify',
    component: Order_Register_Modify,
    props: true
  },
  {
    path: "/logistics/:PageName",
    name: 'Logistics_Main',
    component: Logistics_Main,
  },
  {
    path: "/logistics/storedetail/:OrderIndex",
    name: 'Logistics_Store_Detail',
    component: Logistics_Store_Detail,
    props: true
  },
  {
    path: "/view/order",
    name: 'Order_Register_DirectView',
    component: Order_Register_DirectView,
  },
  {
    path: "/set/order",
    name: 'Order_Register_DirectSet',
    component: Order_Register_DirectSet,
  },
]

const router = createRouter({
  history: createWebHistory(),
  // history: createWebHashHistory(),
  routes,
})

export default router
