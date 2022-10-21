import App from './App.vue'
import { createApp } from 'vue'
import { axios } from '@bundled-es-modules/axios'
import router from './router'

import '@bootstrap/dist/css/bootstrap.min.css'
import '@bootstrap';
// import './style.css'

// 앱 인스턴스 생성
const app = createApp( App )
// 전역변수 설정
app.config.globalProperties.$axios = axios
// 앱 사용 설정
app.use( router )
// 앱 마운트
app.mount( '#app' )
