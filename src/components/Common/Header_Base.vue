<template>
  <div class="w-100">
    <component v-bind:is="Component_Header"></component>
  </div>
</template>

<script setup>
  import Component_Header_SignIn from '@/components/Common/Header_SignIn.vue'
  import Component_Header_SignOut from '@/components/Common/Header_SignOut.vue'

  // 인스턴스 생성
  import { getCurrentInstance, ref, shallowRef, onMounted } from 'vue'
  import LogManager from '@/utility/LogManager'
  import { useRoute } from 'vue-router'
  // 인스턴스 할당
  const AppInstance = getCurrentInstance()
  // 전역변수 할당
  let GLOBAL_PROPERTY = AppInstance.appContext.config.globalProperties
  // 내부변수 할당
  let Component_Header = shallowRef( null )
  // 이벤트 설정
  onMounted(() => {
    LogManager.w( 'Header_Base', 'onMounted()' )
    DisplayLayout_Default()
  })
  // 내부 함수
  function DisplayLayout_Default() {
    if( useRoute().path === "/view/order" ) Component_Header.value = null
    else Component_Header.value = GLOBAL_PROPERTY.$SignInState ? Component_Header_SignIn : Component_Header_SignOut
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
