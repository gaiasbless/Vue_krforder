<template>
  <div container-fluid class="h-100 d-flex flex-column flex-grow-1 align-items-center">
    <div class="row" style="width: 550px">
      <div class="col">

        <div class="row mt-5 border-top border-bottom border-dark bg-primary bg-opacity-25">
          <span class="p-2 fw-bold">▷ 일간 요약</span>
        </div>
        <div class="row py-1 border-bottom border-dark d-flex flex-column">
          <div class="row">
            <span class="px-2">
              - 전체 발주수 : {{ SummaryInfo_Today.OrderQuantity_Ext + SummaryInfo_Today.OrderQuantity_Int }}건
              / {{ NumberFormat( SummaryInfo_Today.PrintQuantity_Ext + SummaryInfo_Today.PrintQuantity_Int ) }}개
            </span>
          </div>
          <div class="row mt-2">
            <span class="px-2">
              - 내부 발주수 : {{ SummaryInfo_Today.OrderQuantity_Int }}건
              / {{ NumberFormat( SummaryInfo_Today.PrintQuantity_Int ) }}개
            </span>
          </div>
          <div class="row">
            <span class="px-2">
              - 외부 발주수 : {{ SummaryInfo_Today.OrderQuantity_Ext }}건
              / {{ NumberFormat( SummaryInfo_Today.PrintQuantity_Ext ) }}개
            </span>
          </div>
          <div class="row mt-3" v-if="SummaryInfo_Today.OrderQuantity_Ext + SummaryInfo_Today.OrderQuantity_Int > 0">
            <span class="px-2">- 제품별 발주 목록</span>
          </div>
          <div class="row" style="width: 450px" v-if="SummaryInfo_Today.OrderQuantity_Ext + SummaryInfo_Today.OrderQuantity_Int > 0">
            <table class="mb-3 ms-3">
              <thead>
                <tr>
                  <th class="text-center align-middle" scope="col">분류</th>
                  <th class="text-center align-middle" scope="col">제품코드</th>
                  <th class="text-center align-middle" scope="col">발주건수</th>
                  <th class="text-center align-middle" scope="col">발행수량</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="OrderInfo in OrderList_Today" v-bind:key="OrderInfo.idx">
                  <td class="text-center align-middle">{{ OrderInfo.OrderType }}</td>
                    <td class="text-center align-middle">{{ OrderInfo.ProductCode }}</td>
                    <td class="pe-3 text-end align-middle">{{ NumberFormat( OrderInfo.OrderQuantity ) }}</td>
                    <td class="pe-4 text-end align-middle">{{ NumberFormat( OrderInfo.PrintQuantity )  }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="row mt-5 border-top border-bottom border-dark bg-primary bg-opacity-25">
          <span class="p-2 fw-bold">▷ 주간 요약</span>
        </div>
        <div class="row py-1 border-bottom border-dark d-flex flex-column">
          <div class="row">
            <span class="px-2">
              - 전체 발주수 : {{ SummaryInfo_Week.OrderQuantity_Ext + SummaryInfo_Week.OrderQuantity_Int }}건
              / {{ NumberFormat( SummaryInfo_Week.PrintQuantity_Ext + SummaryInfo_Week.PrintQuantity_Int ) }}개
            </span>
          </div>
          <div class="row mt-2">
            <span class="px-2">
              - 내부 발주수 : {{ SummaryInfo_Week.OrderQuantity_Int }}건
              / {{ NumberFormat( SummaryInfo_Week.PrintQuantity_Int ) }}개
            </span>
          </div>
          <div class="row">
            <span class="px-2">
              - 외부 발주수 : {{ SummaryInfo_Week.OrderQuantity_Ext }}건
              / {{ NumberFormat( SummaryInfo_Week.PrintQuantity_Ext ) }}개
            </span>
          </div>
          <div class="row mt-3" v-if="SummaryInfo_Week.OrderQuantity_Ext + SummaryInfo_Week.OrderQuantity_Int > 0">
            <span class="px-2">- 제품별 발주 목록</span>
          </div>
          <div class="row" style="width: 450px" v-if="SummaryInfo_Week.OrderQuantity_Ext + SummaryInfo_Week.OrderQuantity_Int > 0">
            <table class="mb-3 ms-3">
              <thead>
                <tr>
                  <th class="text-center align-middle" scope="col">분류</th>
                  <th class="text-center align-middle" scope="col">제품코드</th>
                  <th class="text-center align-middle" scope="col">발주건수</th>
                  <th class="text-center align-middle" scope="col">발행수량</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="OrderInfo in OrderList_Week" v-bind:key="OrderInfo.idx">
                    <td class="text-center align-middle">{{ OrderInfo.OrderType }}</td>
                    <td class="text-center align-middle">{{ OrderInfo.ProductCode }}</td>
                    <td class="pe-3 text-end align-middle">{{ NumberFormat( OrderInfo.OrderQuantity ) }}</td>
                    <td class="pe-4 text-end align-middle">{{ NumberFormat( OrderInfo.PrintQuantity )  }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div v-if="WaitStoreList.length > 0">
          <div class="row mt-5 border-top border-bottom border-dark bg-warning bg-opacity-25">
            <span class="p-2 fw-bold">▷ 입고 대기 ({{ WaitStoreList.length }}건)</span>
          </div>
          <div class="row border-bottom border-dark d-flex flex-column">
            <table class="p-0">
              <thead>
                <tr>
                  <th class="text-center align-middle" scope="col">제품명</th>
                  <th class="text-center align-middle" scope="col">수량</th>
                  <th class="text-center align-middle" scope="col">입고수량</th>
                  <th class="text-center align-middle" scope="col">미입고</th>
                  <th class="text-center align-middle" scope="col">발주자</th>
                  <th class="text-center align-middle" scope="col">경과시간</th>
                  <th class="text-center align-middle" scope="col">생산요청</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="StoreInfo in WaitStoreList" v-bind:key="StoreInfo.idx">
                    <td class="text-center align-middle">{{ StoreInfo.ProductName }}</td>
                    <td class="text-center align-middle">{{ NumberFormat( StoreInfo.Quantity ) }}</td>
                    <td class="text-center align-middle">{{ NumberFormat( StoreInfo.Quantity_Stored ) }}</td>
                    <td class="text-center align-middle">{{ NumberFormat( StoreInfo.Quantity_Left ) }}</td>
                    <td class="text-center align-middle">{{ StoreInfo.Order_Name }}</td>
                    <td class="text-center align-middle">{{ StoreInfo.TimeDiff_Delivered > 60 ? (StoreInfo.TimeDiff_Delivered/60).toFixed(1) + "h" : StoreInfo.TimeDiff_Delivered + "m" }}</td>
                    <td class="text-center align-middle">{{ StoreInfo.ProcessTime_Request }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div v-if="WaitReleaseList.length > 0">
          <div class="row mt-5 border-top border-bottom border-dark bg-success bg-opacity-25">
            <span class="p-2 fw-bold">▷ 출고 대기 ({{ WaitReleaseList.length }}건)</span>
          </div>
          <div class="row border-bottom border-dark d-flex flex-column mb-5">
            <table class="p-0">
              <thead>
                <tr>
                  <th class="text-center align-middle" scope="col">제품명</th>
                  <th class="text-center align-middle" scope="col">수량</th>
                  <th class="text-center align-middle" scope="col">출고수량</th>
                  <th class="text-center align-middle" scope="col">미출고</th>
                  <th class="text-center align-middle" scope="col">발주자</th>
                  <th class="text-center align-middle" scope="col">경과시간</th>
                  <th class="text-center align-middle" scope="col">입고시간</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="ReleaseInfo in WaitReleaseList" v-bind:key="ReleaseInfo.idx">
                    <td class="text-center align-middle">{{ ReleaseInfo.ProductName }}</td>
                    <td class="text-center align-middle">{{ NumberFormat( ReleaseInfo.Quantity ) }}</td>
                    <td class="text-center align-middle">{{ NumberFormat( ReleaseInfo.Quantity_Released ) }}</td>
                    <td class="text-center align-middle">{{ NumberFormat( ReleaseInfo.Quantity_Left ) }}</td>
                    <td class="text-center align-middle">{{ ReleaseInfo.Order_Name }}</td>
                    <td class="text-center align-middle">{{ ReleaseInfo.TimeDiff_Release }}d</td>
                    <td class="text-center align-middle">{{ ReleaseInfo.ProcessTime_Delivered }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
  // 인스턴스 생성
  import { getCurrentInstance, ref, onMounted } from 'vue'
  import LogManager from '@/utility/LogManager'
  import moment from 'moment'
  // 인스턴스 할당
  const AppInstance = getCurrentInstance()
  const AxiosInstance = AppInstance.appContext.config.globalProperties.$axios
  // 전역변수 할당
  let GLOBAL_PROPERTY = AppInstance.appContext.config.globalProperties
  // 내부변수 할당
  const SummaryInfo_Today = ref( { OrderQuantity_Ext: 0, PrintQuantity_Ext: 0, OrderQuantity_Int: 0, PrintQuantity_Int: 0 } )
  const SummaryInfo_Week = ref( { OrderQuantity_Ext: 0, PrintQuantity_Ext: 0, OrderQuantity_Int: 0, PrintQuantity_Int: 0 } )
  const OrderList_Today = ref( null )
  const OrderList_Week = ref( null )
  const WaitStoreList = ref( [] )
  const WaitReleaseList = ref( [] )
  // 이벤트 설정
  onMounted(() => {
    LogManager.w( AppInstance?.type.__name, 'onMounted()' )
    DisplayLayout_Default()
  })
  // 내부 함수
  function DisplayLayout_Default() {
    GetSummaryInfo_Today()
    GetSummaryInfo_Week()
    // API_GetStoreReleaseWaitList()
  }
  function GetSummaryInfo_Today() {
    let DateInstance = new Date();
    API_GetSummaryInfo( 1, DateInstance, DateInstance )
  }
  function GetSummaryInfo_Week() {
    var DateInstance = new Date()
    var NowDayOfWeek = DateInstance.getDay()
    var NowDay = DateInstance.getDate()
    var NowMonth = DateInstance.getMonth()
    var NowYear = DateInstance.getYear()
    NowYear += (NowYear < 2000) ? 1900 : 0
    API_GetSummaryInfo( 2, new Date( NowYear, NowMonth, NowDay - NowDayOfWeek ), new Date( NowYear, NowMonth, NowDay + (6 - NowDayOfWeek) ) )
  }
  // 숫자 포맷 설정 (구분자 콤마 표시)
  function NumberFormat( Number ) {
    return String( Number ).replace( /\B(?=(\d{3})+(?!\d))/g, "," )
  }
  // API 요청 - 요약정보 수집
  function API_GetSummaryInfo( Type, StartDate, FinishDate ) {
    var PostParams = new URLSearchParams()
    PostParams.append( 'START_DATE', moment( StartDate, "YYYY-MM-DD", true ).format( "YYYY-MM-DD" ) );
    PostParams.append( 'FINISH_DATE', moment( FinishDate, "YYYY-MM-DD", true ).format( "YYYY-MM-DD" ) );
    LogManager.w( AppInstance?.type.__name, "API_GetSummaryInfo()", "Parameter", PostParams.toString() )
    AxiosInstance.post( "/api/Home/GetSummaryInfo.php", PostParams )
    .then(response => {
      LogManager.w( AppInstance?.type.__name, "API_GetSummaryInfo()", "Result", JSON.stringify( response.data ) )
      if( response.data.success > 0 ) {
        if( Type == 1 ) {                 // 요약정보 갱신 - 일간
          SummaryInfo_Today.value.OrderQuantity_Ext = response.data.OrderQunatity_Ext
          SummaryInfo_Today.value.PrintQuantity_Ext = response.data.PrintQunatity_Ext
          SummaryInfo_Today.value.OrderQuantity_Int = response.data.OrderQunatity_Int
          SummaryInfo_Today.value.PrintQuantity_Int = response.data.PrintQunatity_Int
          OrderList_Today.value = response.data.data
          // GetSummaryInfo_Week()
        }
        if( Type == 2 ) {                 // 요약정보 갱신 - 주간
          SummaryInfo_Week.value.OrderQuantity_Ext = response.data.OrderQunatity_Ext
          SummaryInfo_Week.value.PrintQuantity_Ext = response.data.PrintQunatity_Ext
          SummaryInfo_Week.value.OrderQuantity_Int = response.data.OrderQunatity_Int
          SummaryInfo_Week.value.PrintQuantity_Int = response.data.PrintQunatity_Int
          OrderList_Week.value = response.data.data
        }
      }
      else if( response.data.success == -1000 ) {
        alert( "인증키 오류가 발생 되었습니다. 로그인 후 사용해 주세요." )
        GLOBAL_PROPERTY.$SignInState = false
        router.push( "/" )
      }
      else alert( "서버 요청 오류 - 잠시 후 다시 시도해 주세요" )
    })
    .catch(ex => {
      LogManager.w( AppInstance?.type.__name, "API_GetSummaryInfo()", "서버 요청 오류", ex )
      alert( "서버 요청 오류 - 잠시 후 다시 시도해 주세요" )
    })
  }
  // API 요청 - 입출고 요약 정보 수집
  function API_GetStoreReleaseWaitList() {
    var PostParams = new URLSearchParams()
    // PostParams.append( 'FINISH_DATE', moment( FinishDate, "YYYY-MM-DD", true ).format( "YYYY-MM-DD" ) );
    LogManager.w( AppInstance?.type.__name, "API_GetStoreReleaseWaitList()", "Parameter", PostParams.toString() )
    AxiosInstance.post( "/api/Home/GetStoreReleaseWaitList.php", PostParams )
    .then(response => {
      LogManager.w( AppInstance?.type.__name, "API_GetStoreReleaseWaitList()", "Result", JSON.stringify( response.data ) )
      if( response.data.success > 0 ) {
        WaitStoreList.value = response.data.store
        WaitReleaseList.value = response.data.release
      }
      else if( response.data.success == -1000 ) {
        alert( "인증키 오류가 발생 되었습니다. 로그인 후 사용해 주세요." )
        GLOBAL_PROPERTY.$SignInState = false
        router.push( "/" )
      }
      else alert( "서버 요청 오류 - 잠시 후 다시 시도해 주세요" )
    })
    .catch(ex => {
      LogManager.w( AppInstance?.type.__name, "API_GetStoreReleaseWaitList()", "서버 요청 오류", ex )
      alert( "서버 요청 오류 - 잠시 후 다시 시도해 주세요" )
    })
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
thead th {
    font-size: 75%;
    background-color: #f9f9f9;
    color: black;
    text-align: center;
    text-decoration: none;
    font-weight: bold;
    border-top: 1px solid #000000;
    border-bottom: 1px solid #000000;
    border-style: dotted;
}
table td {
  font-size: 75%;
}
</style>
