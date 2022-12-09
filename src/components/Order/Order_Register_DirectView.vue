<template>
  <div class="h-100 d-flex flex-row" style="overflow-x: hidden;">
    <p v-html="HtmlData"></p>
  </div>
</template>

<script setup>
  // 외부데이터 전달
  const Emits = defineEmits( [ "Event_UpdateSignIn" ] )
  // 인스턴스 생성
  import { getCurrentInstance, ref, shallowRef, onMounted, onUpdated } from 'vue'
  import LogManager from '@/utility/LogManager'
  import router from '@/router'
  import { useRoute } from 'vue-router'
  // 인스턴스 할당
  const AppInstance = getCurrentInstance()
  const AxiosInstance = AppInstance.appContext.config.globalProperties.$axios
  // 전역변수 할당
  let GLOBAL_PROPERTY = AppInstance.appContext.config.globalProperties
  // 내부변수 할당
  const HtmlData = ref( null )
  // 이벤트 설정
  onMounted(() => {
    LogManager.w( "Order_Register_DirectView", "onMounted()" )
    DisplayLayout_Default()
  })
  // 내부 함수
  function DisplayLayout_Default() {
    // 헤더 상태 갱신 요청
    Emits( "Event_UpdateSignIn" )
    console.log( useRoute().query.id )
    API_GenerateHtml_OrderForm( useRoute().query.id )
  }
  // API 요청 - 발주서 폼 HTML 데이터 수집
  function API_GenerateHtml_OrderForm( OrderId ) {
    var PostParams = new URLSearchParams();
    PostParams.append( 'ORDER_ID', OrderId )
    LogManager.w( AppInstance?.type.__name, "API_GenerateHtml_OrderForm()", "Parameter", PostParams.toString() )
    AxiosInstance.post( "/api/Order/Register/GenerateHtml_OrderForm_Web.php", PostParams )
    .then(response => {
      LogManager.w( AppInstance?.type.__name, "API_GenerateHtml_OrderForm()", "Result", JSON.stringify( response.data ) )
      HtmlData.value = response.data
      if( HtmlData.value.length < 10 ) alert( "데이터가 존재하지 않습니다.\n관리자에 의해 데이터가 삭제되었거나 시스템 오류 입니다." )
    })
    .catch(ex => {
      LogManager.w( AppInstance?.type.__name, "API_GenerateHtml_OrderForm()", "서버 요청 오류", ex )
      alert( "서버 요청 오류 - 잠시 후 다시 시도해 주세요" )
    })
  }
</script>

<script>
export default {
  name: 'Order_Register_DirectView',
  data() {
    return {
    }
  },
  created() {
  },
}
</script>
