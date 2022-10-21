<template>
  <component v-bind:is="Component_Header_Base"></component>
  <router-view/>
</template>

<script setup>
  import Component_Header_Base from '@/components/Common/Header_Base.vue'

  // 인스턴스 생성
  import { getCurrentInstance, ref, onMounted } from 'vue'
  import LogManager from '@/utility/LogManager'
  // 인스턴스 할당
  const AppInstance = getCurrentInstance()
  // 전역변수 할당
  // 내부변수 할당
  // 기본 레이아웃 출력
  DisplayLayout_Default()
  // 이벤트 설정
  onMounted(() => {
    LogManager.w( 'App_Main', 'onMounted()' )
  })
  // 내부 함수
  function DisplayLayout_Default() {
  }
</script>
