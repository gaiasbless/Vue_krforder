<template>
  <div class="w-100 d-flex flex-column p-2">

    <div class="d-flex flex-row">
      <img class="mt-1 me-2" src="@bootstrap-icons/icons/save.svg" width="18" height="18">
      <h5><b>입고 대기 목록</b></h5>
    </div>

    <span class="text-info" style="font-size: 80%; text-decoration: underline;">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="align-text-bottom bi bi-star" viewBox="0 0 16 16">
        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
      </svg>
      외부 발주된 품목 중 입고 대기중인 상품 목록을 출력 합니다.
    </span>

    <div class="row mt-3">
      <div class="col-md-auto d-flex flex-row flex-nowrap align-items-center">
        <button class="btn btn-sm btn-outline-primary" type="button" v-on:click="API_GetWaitStoreList()">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
          </svg>
          새로고침
        </button>
      </div>
      <div class="col d-flex align-items-center justify-content-end">
        <!-- <button style="width: 70px" type="button" class="btn btn-sm btn-outline-secondary" v-on:click="PrintMainContent" block>인쇄</button> -->
      </div>
    </div>

    <div id="MainContent" class="w-100 mt-3 border-top border-dark">
      <table class="table table-sm table-hover">
        <thead>
          <tr>
            <th class="text-center align-middle" scope="col">주문번호</th>
            <th class="text-center align-middle" scope="col">일련번호</th>
            <th class="text-center align-middle" scope="col">품명</th>
            <th class="text-center align-middle" scope="col">수량</th>
            <th class="text-center align-middle" scope="col">입고수량</th>
            <th class="text-center align-middle" scope="col">미입고수량</th>
            <th class="text-center align-middle" scope="col">주문자</th>
            <th class="text-center align-middle" scope="col">발주처</th>
            <th class="text-center align-middle" scope="col">경과시간</th>
            <th class="text-center align-middle" scope="col">생산요청시간</th>
            <th class="text-center align-middle" scope="col">발주시간</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="StoreInfo in WaitStoreList" v-bind:key="StoreInfo.idx" v-on:click="DisplayLayout_Store_Detail( StoreInfo.idx )">
              <td class="text-center align-middle">{{ StoreInfo.OrderNumber }}</td>
              <td class="text-center align-middle">{{ StoreInfo.SerialNumber }}</td>
              <td class="text-center align-middle">{{ StoreInfo.ProductName }}</td>
              <td class="text-center align-middle">{{ NumberFormat( StoreInfo.Quantity ) }}</td>
              <td class="text-center align-middle">{{ NumberFormat( StoreInfo.Quantity_Stored ) }}</td>
              <td class="text-center align-middle text-danger">{{ NumberFormat( StoreInfo.Quantity_Left ) }}</td>
              <td class="text-center align-middle">{{ StoreInfo.Order_Name }}</td>
              <td class="text-center align-middle">{{ StoreInfo.ReceiveOrder_Company }}</td>
              <td class="text-center align-middle">{{ StoreInfo.TimeDiff_Delivered > 60 ? (StoreInfo.TimeDiff_Delivered/60).toFixed(1) + "h" : StoreInfo.TimeDiff_Delivered + "m" }}</td>
              <td class="text-center align-middle">{{ StoreInfo.ProcessTime_Request }}</td>
              <td class="text-center align-middle">{{ StoreInfo.RegisterTime }}</td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script setup>
  // 인스턴스 생성
  import { getCurrentInstance, ref, shallowRef, onMounted } from 'vue'
  import LogManager from '@/utility/LogManager'
  import router from '@/router'
  import moment from 'moment'
  // 인스턴스 할당
  const AppInstance = getCurrentInstance()
  const AxiosInstance = AppInstance.appContext.config.globalProperties.$axios
  // 전역변수 할당
  let GLOBAL_PROPERTY = AppInstance.appContext.config.globalProperties
  // 내부변수 할당
  let WaitStoreList = ref( [] )
  // 이벤트 설정
  onMounted(() => {
    LogManager.w( "Logistics_Store", 'onMounted()' )
    DisplayLayout_Default()
  })
  // 레이아웃 출력 - 기본
  function DisplayLayout_Default() {
    API_GetWaitStoreList()
  }
  // 레이아웃 출력 - 입고대기 상세화면
  function DisplayLayout_Store_Detail( Param_OrderIndex ) {
    LogManager.w( AppInstance?.type.__name, "DisplayLayout_Store_Detail()", "OrderIndex", Param_OrderIndex )
    router.push( { name: 'Logistics_Store_Detail', params: { OrderIndex: Param_OrderIndex }} )
  }
  // 숫자 포맷 설정 (구분자 콤마 표시)
  function NumberFormat( Number ) {
    return String( Number ).replace( /\B(?=(\d{3})+(?!\d))/g, "," )
  }
  // API 요청 - 입고 대기 목록 수집
  function API_GetWaitStoreList() {
    var PostParams = new URLSearchParams()
    // PostParams.append( 'FINISH_DATE', moment( DatePicker_Finish.value, "YYYY-MM-DD", true ).format( "YYYY-MM-DD" ) );
    LogManager.w( AppInstance?.type.__name, "API_GetWaitStoreList()", "Parameter", PostParams.toString() )
    AxiosInstance.post( "/api/Logistics/Store/GetWaitStoreList.php", PostParams )
    .then(response => {
      LogManager.w( AppInstance?.type.__name, "API_GetWaitStoreList()", "Result", JSON.stringify( response.data ) )
      if( response.data.success > 0 ) {
        WaitStoreList.value = response.data.data
      }
      else if( response.data.success == -10 ) {
        alert( "입고 대기 목록 열람 권한이 없습니다." )
      }
      else if( response.data.success == -1000 ) {
        alert( "인증키 오류가 발생 되었습니다. 로그인 후 사용해 주세요." )
        GLOBAL_PROPERTY.$SignInState = false
        router.push( "/" )
      }
      else alert( "서버 요청 오류 - 잠시 후 다시 시도해 주세요" )
    })
    .catch(ex => {
      LogManager.w( AppInstance?.type.__name, "API_GetWaitStoreList()", "서버 요청 오류", ex )
      alert( "서버 요청 오류 - 잠시 후 다시 시도해 주세요" )
    })
  }
</script>

<script>
export default {
  name: 'Logistics_Store',
  data() {
    return {
    }
  },
  created() {
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
html, body, div {
  font-size: 95%;
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
thead th {
    font-size: 95%;
    background-color: #dddddd;
    color: black;
    text-align: center;
    text-decoration: none;
    font-weight: bold;
    border-bottom: 1px solid #000000;
}
table td {
  font-size: 80%;
}
</style>
