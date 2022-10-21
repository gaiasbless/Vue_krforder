<template>
  <div class="w-100">
    <nav class="navbar navbar-expand-lg bg-primary">
    </nav>
  </div>
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
  },
}
</script>
