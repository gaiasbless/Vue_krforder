import App from './App.vue'
import { createApp } from 'vue'
import { axios } from '@bundled-es-modules/axios'
import { LogManager } from '@/utility/LogManager'
import router from '@/router'

import '@bootstrap/dist/css/bootstrap.min.css'
import '@bootstrap'
import '@/assets/scss/custom.scss'

// 앱 인스턴스 생성
const app = createApp( App )
// 전역변수 설정
app.config.globalProperties.$axios = axios
app.config.globalProperties.$SignInState = false
// 앱 사용 설정
app.use( router )
// 앱 마운트
app.mount( '#app' )

// 라우터 네비게이션 가드
router.beforeEach((to, from, next) => {
  let Global_SignInState = app.config.globalProperties.$SignInState
  if( Global_SignInState ) {
    LogManager.w( 'Router Event', 'beforeEach - 로그인', '이동경로', to.path )
    next()
  }
  else {
    if( to.path === '/user/signin' ) next()
    else {
      LogManager.w( 'Router Event', 'beforeEach - 로그아웃', '이동경로', to.path )
      next( '/user/signin' )
    }
  }
});
