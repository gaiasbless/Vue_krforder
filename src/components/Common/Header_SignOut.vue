<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary px-2">
    <a class="navbar-brand" href="#">
      <img class="d-inline-block align-text-middle" src="@/assets/logo_krf.jpg" width="30" height="30"><b class="ms-2">K-RF 업무관리</b>
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
  import LogManager from '@/utility/LogManager'
  import router from '@/router'
  // 인스턴스 할당
  const AppInstance = getCurrentInstance()
  // 전역변수 할당
  // 이벤트 설정
  onMounted(() => {
    LogManager.w( 'Header_SignOut', 'onMounted()' )
    DisplayLayout_Default()
  })
  // 내부 함수
  function DisplayLayout_Default() {
    router.push( '/user/signin' )
  }
</script>

<script>
export default {
  name: 'Header_SignOut',
  data() {
    return {
    }
  },
  created() {
    // this.$router.push( '/user/signin' )
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
</style>
