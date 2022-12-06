<template>
  <div container-fluid class="h-100 d-flex flex-column flex-grow-1 align-items-center">
    <div class="row mt-5">
      <div class="col me-3">
        <div class="row border-top border-bottom border-success bg-light" style="width: 450px">
          <span class="p-2 fw-bold">일간 요약</span>
        </div>
        <div class="row border-bottom border-dark d-flex flex-column" style="height:300px">
          <div class="row"><span class="mt-1 px-2">▷ 전체 발주수 : 0건</span></div>
          <div class="row"><span class="px-2">▷ 내부 발주수 : 0건</span></div>
          <div class="row"><span class="px-2">▷ 외부 발주수 : 0건</span></div>
        </div>
      </div>
      <div class="col ms-3">
        <div class="row border-top border-bottom border-dark bg-light" style="width: 450px">
          <span class="p-2 fw-bold">주간 요약</span>
        </div>
        <div class="row border-bottom border-dark d-flex flex-column" style="height:300px">
          <div class="row"><span class="mt-1 px-2">- 전체 발주수 : 0건</span></div>
          <div class="row"><span class="px-2">- 내부 발주수 : 0건</span></div>
          <div class="row"><span class="px-2">- 외부 발주수 : 0건</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  // 인스턴스 생성
  import { getCurrentInstance, ref, onMounted } from 'vue'
  import LogManager from '@/utility/LogManager'
  // 인스턴스 할당
  const AppInstance = getCurrentInstance()
  const AxiosInstance = AppInstance.appContext.config.globalProperties.$axios
  // 전역변수 할당
  let GLOBAL_PROPERTY = AppInstance.appContext.config.globalProperties
  // 이벤트 설정
  onMounted(() => {
    LogManager.w( AppInstance?.type.__name, 'onMounted()' )
    DisplayLayout_Default()
  })
  // 내부 함수
  function DisplayLayout_Default() {
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
html, body {
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
span {
  font-size: 90%;
}
</style>
