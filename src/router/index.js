import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'
import RouterTest from '@/components/RouteTest.vue'
import SignIn from '@/components/User/SignIn.vue'

const routes = [
  {
    path: "/",
    name: 'HelloWorld',
    component: HelloWorld,
  },
  {
    path: "/rt",
    name: 'RouterTest',
    component: RouterTest,
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
  console.log('라우터 이벤트 - 이동경로 : ' + to.path)
  next()
});

export default router;
