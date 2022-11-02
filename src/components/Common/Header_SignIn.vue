<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-korea px-2">
    <a class="navbar-brand" href="#">
      <img class="d-inline-block align-text-middle" src="@/assets/logo_krf.jpg" width="30" height="30"><b class="ms-2">K-RF</b>
    </a>
    <ul class="navbar-nav">
      <li class="nav-item">
        <router-link class="nav-link active" aria-current="page" to="/">홈</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link active" aria-current="page" to="/user/signin">발주관리</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link active" aria-current="page" to="/user/signin">-</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link active" aria-current="page" to="/user/signin">-</router-link>
      </li>
    </ul>
    <ul class="navbar-nav ms-auto">
      <li class="nav-item">
        <router-link class="nav-link active" aria-current="page" to="/user/signin">로그아웃</router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup>
  // 인스턴스 생성
  import { getCurrentInstance, ref, onMounted } from 'vue'
  import LogManager from '@/utility/LogManager'
  // 인스턴스 할당
  const AppInstance = getCurrentInstance()
  // 전역변수 할당
  let Global_SignInState = AppInstance.appContext.config.globalProperties.$SignInState
  // 이벤트 설정
  onMounted(() => {
    LogManager.w( 'Header_SignIn', 'onMounted()' )
  })
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
