<template>
  <div class="w-100">
    출고 완료 목록
  </div>
</template>

<script setup>

  // 인스턴스 생성
  import { getCurrentInstance, ref, shallowRef, onMounted } from 'vue'
  import LogManager from '@/utility/LogManager'
  // 인스턴스 할당
  const AppInstance = getCurrentInstance()
  // 전역변수 할당
  let GLOBAL_PROPERTY = AppInstance.appContext.config.globalProperties
  // 내부변수 할당
  // 이벤트 설정
  onMounted(() => {
    LogManager.w( "Order_Release", 'onMounted()' )
    DisplayLayout_Default()
  })
  // 내부 함수
  function DisplayLayout_Default() {
  }
</script>

<script>
export default {
  name: 'Order_Release',
  data() {
    return {
    }
  },
  created() {
  },
}
</script>
