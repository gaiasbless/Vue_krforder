<template>
  <div class="w-100">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary px-2">
      <a class="navbar-brand" href="#">
        <img class="d-inline-block align-text-middle" src="@/assets/logo_krf.jpg" width="30" height="30"><b class="ms-2">K-RF 업무관리</b>
      </a>
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link class="nav-link active" aria-current="page" to="/">홈</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link active" aria-current="page" v-bind:to="{ name: 'Order_Main', params: { PageName: 'list' }}">발주관리</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link active" aria-current="page" v-bind:to="{ name: 'Logistics_Main', params: { PageName: 'store' }}">입출고관리</router-link>
        </li>
      </ul>
      <ul class="navbar-nav ms-auto">
        <li class="nav-item">
          <router-link class="nav-link active" aria-current="page" to="/user/info" style="font-size: 90%;">정보수정({{ GLOBAL_PROPERTY.$UserName }})</router-link>
        </li>
        <li class="nav-item">
          <a href="" class="nav-link active" v-on:click="SetSignOutState" style="font-size: 90%;">로그아웃</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
  // 외부데이터 전달
  const Emits = defineEmits( [ "Event_UpdateSignIn" ] )
  // 인스턴스 생성
  import { getCurrentInstance, ref, onMounted } from 'vue'
  import LogManager from '@/utility/LogManager'
  import router from '@/router'
  // 인스턴스 할당
  const AppInstance = getCurrentInstance()
  // 전역변수 할당
  let GLOBAL_PROPERTY = AppInstance.appContext.config.globalProperties
  // 이벤트 설정
  onMounted(() => {
    LogManager.w( 'Header_SignIn', 'onMounted()' )
    DisplayLayout_Default()
  })
  // 내부 함수
  function DisplayLayout_Default() {
  }
  function SetSignOutState() {
    GLOBAL_PROPERTY.$SignInState = false
    GLOBAL_PROPERTY.$SignInToken = ''
    GLOBAL_PROPERTY.$UserId = ''
    GLOBAL_PROPERTY.$UserName = ''
    router.push( "/user/signin" )
    Emits( "Event_UpdateSignIn" )
  }
</script>

<script>
export default {
  name: 'Header_SignIn',
  data() {
    return {
    }
  },
  created() {
  },
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 5 5px;
}
a {
  color: #ffffff;
}
.navbar-dark .navbar-nav .nav-link{
  color: white;
  font-size: medium;
}
.navbar-dark:hover .navbar-nav:hover .nav-link:hover{
  color: white;
  text-decoration: underline;
}
</style>
