<template>
  <div class="w-100">
    <component v-bind:is="Component_Header"></component>
  </div>
</template>

<script setup>
  import Component_Header_SignIn from '@/components/Common/Header_SignIn.vue'
  import Component_Header_SignOut from '@/components/Common/Header_SignOut.vue'

  // 인스턴스 생성
  import { getCurrentInstance, ref, onMounted } from 'vue'
  import LogManager from '@/utility/LogManager'
  // 인스턴스 할당
  const AppInstance = getCurrentInstance()
  // 전역변수 할당
  let Global_SignInState = AppInstance.appContext.config.globalProperties.$SignInState
  // 내부변수 할당
  let Component_Header = null
  // 기본 레이아웃 출력
  DisplayLayout_Default()
  // 이벤트 설정
  onMounted(() => {
    LogManager.w( 'Header_Base', 'onMounted()' )
  })
  // 내부 함수
  function DisplayLayout_Default() {
    Component_Header = Global_SignInState ? Component_Header_SignIn : Component_Header_SignOut
  }
</script>

<script>
export default {
  name: 'Header_Base',
  data() {
    return {
    }
  },
  created() {
  },
}
</script>
