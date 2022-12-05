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
app.config.globalProperties.$SignInToken = ""
app.config.globalProperties.$UserId = ""
app.config.globalProperties.$UserName = ""
// 앱 사용 설정
app.use( router )
// 앱 마운트
app.mount( '#app' )

// 라우터 네비게이션 가드
router.beforeEach((to, from, next) => {
  if( app.config.globalProperties.$SignInState ) {
    LogManager.w( 'Router Event', 'beforeEach - 로그인', '이동경로', to.path )
    // 라우터 이동
    if( to.path === '/user/signin' ) router.replace( '/' )
    else next()
  }
  else {
    // Axios 헤더 데이터 초기화
    delete axios.defaults.headers.common['userindex']
    delete axios.defaults.headers.common['authorization']
    // 라우터 이동
    if( to.path === '/user/signin' ) next()
    else if( to.path === '/user/signup' ) next()
    else {
      LogManager.w( 'Router Event', 'beforeEach - 로그아웃', '이동경로', to.path )
      next( '/user/signin' )
    }
  }
});
