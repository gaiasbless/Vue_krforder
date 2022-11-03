<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-korea px-2">
    <a class="navbar-brand" href="#">
      <img class="d-inline-block align-text-middle" src="@/assets/logo_krf.jpg" width="30" height="30"><b class="ms-2">K-RF</b>
    </a>
    <ul class="navbar-nav" style="padding-bottom: 2px">
      <li class="nav-item">
        <!-- <a class="nav-link active" aria-current="page" href="/">홈</a> -->
      </li>
    </ul>

    <ul class="navbar-nav ms-auto" style="padding-bottom: 2px">
      <li class="nav-item">
        <!-- <router-link class="nav-link active" aria-current="page" to="/user/signin" v-if="RouterInstance.path !== '/user/signin'">회원가입</router-link> -->
      </li>
    </ul>
  </nav>
</template>

<script setup>
  // 인스턴스 생성
  import { getCurrentInstance, ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import LogManager from '@/utility/LogManager'
  // 인스턴스 할당
  const AppInstance = getCurrentInstance()
  const RouterInstance = useRoute()
  // 전역변수 할당
  let Global_SignInState = AppInstance.appContext.config.globalProperties.$SignInState
  // 이벤트 설정
  onMounted(() => {
    LogManager.w( 'Header_SignOut', 'onMounted()' )
  })
</script>

<script>
export default {
  name: 'Header_SignOut',
  data() {
    return {
    }
  },
  created() {
    this.$router.push( '/user/signin' )
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
