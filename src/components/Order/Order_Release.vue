<template>
  <div class="w-100 d-flex flex-column p-2" style="min-width: 900px">

    <div class="d-flex flex-row">
      <img class="mt-1 me-2" src="@bootstrap-icons/icons/check-square.svg" width="18" height="18">
      <h5><b>출고 완료 목록</b></h5>
    </div>

    <span class="text-info" style="font-size: 80%; text-decoration: underline;">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="align-text-bottom bi bi-star" viewBox="0 0 16 16">
        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
      </svg>
      출고 완료된 제품 목록이 출력 됩니다.
    </span>

    <div class="row mt-3">
      <div class="col-md-auto d-flex flex-row flex-nowrap align-items-center">
        <span>시작 날짜</span>
        <Datepicker style="width: 170px; margin-left: 10px" v-model="DatePicker_Start" format="yyyy-MM-dd" locale="ko" :enableTimePicker="false" :clearable="false" nowButtonLabel="오늘" autoApply showNowButton></Datepicker>
        <span class="ms-2">종료 날짜</span>
        <Datepicker style="width: 170px; margin-left: 10px" v-model="DatePicker_Finish" format="yyyy-MM-dd" locale="ko" :enableTimePicker="false" :clearable="false" nowButtonLabel="오늘" autoApply showNowButton></Datepicker>
        <button class="btn btn-sm btn-outline-primary ms-2" type="button" v-on:click="API_GetReleaseList()">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
          </svg>
          새로고침
        </button>
        <button type="button" class="btn btn-sm btn-outline-secondary ms-3" v-on:click="DatePicker_Today">오늘</button>
        <button type="button" class="btn btn-sm btn-outline-secondary ms-1" v-on:click="DatePicker_Week">이번주</button>
        <button type="button" class="btn btn-sm btn-outline-secondary ms-1" v-on:click="DatePicker_Month">이번달</button>
      </div>
      <div class="col d-flex align-items-center justify-content-end">
        <!-- <button style="width: 70px" type="button" class="btn btn-sm btn-outline-secondary" v-on:click="PrintMainContent" block>인쇄</button> -->
      </div>
    </div>

    <div id="MainContent" class="w-100 mt-3 border-top border-bottom border-dark">
      <table class="table table-sm table-hover my-0">
        <thead>
          <tr>
            <th class="text-center align-middle" scope="col">번호</th>
            <th class="text-center align-middle" scope="col">분류</th>
            <th class="text-center align-middle" scope="col">품명</th>
            <th class="text-center align-middle" scope="col">수량</th>
            <th class="text-center align-middle" scope="col">단위수량</th>
            <th class="text-center align-middle" scope="col">주문</th>
            <th class="text-center align-middle" scope="col">발주처</th>
            <th class="text-center align-middle" scope="col">작업자</th>
            <th class="text-center align-middle" scope="col">전체</th>
            <th class="text-center align-middle" scope="col">입고</th>
            <th class="text-center align-middle" scope="col">완료</th>
            <th class="text-center align-middle" scope="col">생산</th>
            <th class="text-center align-middle" scope="col">배정</th>
            <th class="text-center align-middle" scope="col">전달</th>
            <th class="text-center align-middle" scope="col">발주시간</th>
            <th class="text-center align-middle" scope="col">출고시간</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ReleaseInfo in ReleaseList" v-bind:key="ReleaseInfo.idx">
              <td class="text-center align-middle">{{ ReleaseInfo.SerialNumber }}</td>
              <td class="text-center align-middle">{{ ReleaseInfo.OrderType }}</td>
              <td class="text-center align-middle">{{ ReleaseInfo.ProductName }}</td>
              <td class="text-center align-middle">{{ NumberFormat( ReleaseInfo.Quantity ) }}</td>
              <td class="text-center align-middle">{{ ReleaseInfo.Quantity_Unit == 0 ? '-' : NumberFormat( ReleaseInfo.Quantity_Unit ) }}</td>
              <td class="text-center align-middle">{{ ReleaseInfo.Order_Name }}</td>
              <td class="text-center align-middle">{{ ReleaseInfo.Order_Company }}</td>
              <td class="text-center align-middle">{{ ReleaseInfo.WorkerName }}</td>
              <td class="text-center align-middle">{{ ReleaseInfo.TimeDiff_Total > 60 ? (ReleaseInfo.TimeDiff_Total/60).toFixed(1) + "h" : ReleaseInfo.TimeDiff_Total + "m" }}</td>
              <td class="text-center align-middle">{{ ReleaseInfo.TimeDiff_Delivered > 60 ? (ReleaseInfo.TimeDiff_Delivered/60).toFixed(1) + "h" : ReleaseInfo.TimeDiff_Delivered + "m" }}</td>
              <td class="text-center align-middle">{{ ReleaseInfo.TimeDiff_Complete > 60 ? (ReleaseInfo.TimeDiff_Complete/60).toFixed(1) + "h" : ReleaseInfo.TimeDiff_Complete + "m" }}</td>
              <td class="text-center align-middle">{{ ReleaseInfo.TimeDiff_Progress > 60 ? (ReleaseInfo.TimeDiff_Progress/60).toFixed(1) + "h" : ReleaseInfo.TimeDiff_Progress + "m" }}</td>
              <td class="text-center align-middle">{{ ReleaseInfo.TimeDiff_Assign > 60 ? (ReleaseInfo.TimeDiff_Assign/60).toFixed(1) + "h" : ReleaseInfo.TimeDiff_Assign + "m" }}</td>
              <td class="text-center align-middle">{{ ReleaseInfo.TimeDiff_ExtRegister > 60 ? (ReleaseInfo.TimeDiff_ExtRegister/60).toFixed(1) + "h" : ReleaseInfo.TimeDiff_ExtRegister + "m" }}</td>
              <td class="text-center align-middle">{{ ReleaseInfo.RegisterTime }}</td>
              <td class="text-center align-middle">{{ ReleaseInfo.ProcessTime_Release }}</td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script setup>
  import '@vuepic/vue-datepicker/dist/main.css';

  // 인스턴스 생성
  import { getCurrentInstance, ref, shallowRef, onMounted } from 'vue'
  import LogManager from '@/utility/LogManager'
  import moment from 'moment'
  import Datepicker from '@vuepic/vue-datepicker';
  // 인스턴스 할당
  const AppInstance = getCurrentInstance()
  const AxiosInstance = AppInstance.appContext.config.globalProperties.$axios
  // 전역변수 할당
  let GLOBAL_PROPERTY = AppInstance.appContext.config.globalProperties
  // 내부변수 할당
  let DatePicker_Start = ref( new Date() )
  let DatePicker_Finish = ref( new Date() )
  let ReleaseList = ref( [] )
  // 이벤트 설정
  onMounted(() => {
    LogManager.w( "Order_Release", 'onMounted()' )
    DisplayLayout_Default()
  })
  // 내부 함수
  function DisplayLayout_Default() {
    API_GetReleaseList()
  }
  function DatePicker_Today() {
    let DateInstance = new Date();
    DatePicker_Start.value = DateInstance
    DatePicker_Finish.value = DateInstance
    API_GetReleaseList()
  }
  function DatePicker_Week() {
    var DateInstance = new Date()
    var NowDayOfWeek = DateInstance.getDay()
    var NowDay = DateInstance.getDate()
    var NowMonth = DateInstance.getMonth()
    var NowYear = DateInstance.getYear()
    NowYear += (NowYear < 2000) ? 1900 : 0
    DatePicker_Start.value = new Date( NowYear, NowMonth, NowDay - NowDayOfWeek )
    DatePicker_Finish.value = new Date( NowYear, NowMonth, NowDay + (6 - NowDayOfWeek) )
    API_GetReleaseList()
  }
  function DatePicker_Month() {
    var DateInstance = new Date()
    var NowMonth = DateInstance.getMonth()
    var NowYear = DateInstance.getYear()
    NowYear += (NowYear < 2000) ? 1900 : 0
    DatePicker_Start.value = new Date( NowYear, NowMonth, 1 )
    DatePicker_Finish.value = new Date( new Date( NowYear, NowMonth+1, 1 ) - 1 )
    API_GetReleaseList()
  }
  // 숫자 포맷 설정 (구분자 콤마 표시)
  function NumberFormat( Number ) {
    return String( Number ).replace( /\B(?=(\d{3})+(?!\d))/g, "," )
  }
  // API 요청 - 발주 제품 목록
  function API_GetReleaseList() {
    var PostParams = new URLSearchParams()
    PostParams.append( 'START_DATE', moment( DatePicker_Start.value, "YYYY-MM-DD", true ).format( "YYYY-MM-DD" ) );
    PostParams.append( 'FINISH_DATE', moment( DatePicker_Finish.value, "YYYY-MM-DD", true ).format( "YYYY-MM-DD" ) );
    LogManager.w( AppInstance?.type.__name, "API_GetReleaseList()", "Parameter", PostParams.toString() )
    AxiosInstance.post( "/api/Order/ReleaseList/GetReleaseList.php", PostParams )
    .then(response => {
      LogManager.w( AppInstance?.type.__name, "API_GetReleaseList()", "Result", JSON.stringify( response.data ) )
      if( response.data.success > 0 ) {
        ReleaseList.value = response.data.data
      }
      else if( response.data.success == -10 ) {
        alert( "출고완료 목록 열람 권한이 없습니다." )
        router.push( "/" )
      }
      else if( response.data.success == -1000 ) {
        alert( "인증키 오류가 발생 되었습니다. 로그인 후 사용해 주세요." )
        GLOBAL_PROPERTY.$SignInState = false
        router.push( "/" )
      }
      else alert( "서버 요청 오류 - 잠시 후 다시 시도해 주세요" )
    })
    .catch(ex => {
      LogManager.w( AppInstance?.type.__name, "API_GetOrderProductList()", "서버 요청 오류", ex )
      alert( "서버 요청 오류 - 잠시 후 다시 시도해 주세요" )
    })
  }
</script>

<script>
export default {
  name: 'Order_ProductList',
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
