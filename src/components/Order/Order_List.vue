<template>
  <div class="w-100 d-flex flex-column p-2" style="min-width: 900px">

    <div class="d-flex flex-row">
      <img class="mt-1 me-2" src="@bootstrap-icons/icons/Telephone.svg" width="18" height="18">
      <h5><b>발주 목록</b></h5>
    </div>

    <span class="text-info" style="font-size: 80%; text-decoration: underline;">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="align-text-bottom bi bi-star" viewBox="0 0 16 16">
        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
      </svg>
      등록된 전체 발주 목록이 출력 됩니다.
    </span>

    <div class="row mt-3">
      <div class="col-md-auto d-flex flex-row flex-nowrap align-items-center">
        <span>시작 날짜</span>
        <Datepicker style="width: 170px; margin-left: 10px" v-model="DataPicker_Start" format="yyyy-MM-dd" locale="ko" :enableTimePicker="false" :clearable="false" nowButtonLabel="오늘" autoApply showNowButton></Datepicker>
        <span class="ms-2">종료 날짜</span>
        <Datepicker style="width: 170px; margin-left: 10px" v-model="DataPicker_Finish" format="yyyy-MM-dd" locale="ko" :enableTimePicker="false" :clearable="false" nowButtonLabel="오늘" autoApply showNowButton></Datepicker>
        <button class="btn btn-sm btn-outline-primary ms-2" type="button" v-on:click="DatePicker_Refresh">
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
        <button style="width: 70px" type="button" class="btn btn-sm btn-outline-secondary" v-on:click="PrintMainContent" block>인쇄</button>
      </div>
    </div>

    <div id="MainContent" class="w-100 mt-3 border-top border-dark">
      <table class="table table-sm table-hover border-bottom border-dark">
        <thead>
          <tr>
            <th class="text-center align-middle" scope="col">번호</th>
            <th class="text-center align-middle" scope="col">거래처</th>
            <th class="text-center align-middle" scope="col">품명</th>
            <th class="text-center align-middle" scope="col">폭 (mm)</th>
            <th class="text-center align-middle" scope="col">길이 (m)</th>
            <th class="text-center align-middle" scope="col">수량 (roll/ea)</th>
            <th class="text-center align-middle" scope="col">수량 (㎡)</th>
            <th class="text-center align-middle" scope="col">발주자</th>
            <th class="text-center align-middle" scope="col">작업자</th>
            <th class="text-center align-middle" scope="col">진행상태</th>
            <th class="text-center align-middle" scope="col">진행시간</th>
            <th class="text-center align-middle" scope="col">발주시간</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="OrderInfo in OrderList" v-bind:key="OrderInfo.idx" v-on:click="DisplayOrderModify( OrderInfo.idx )">
              <td class="text-center align-middle">{{ OrderInfo.SerialNumber }} </td>
              <td class="text-center align-middle">{{ OrderInfo.Order_Company }} </td>
              <td class="text-center align-middle">{{ OrderInfo.Product_Code }} </td>
              <td class="text-center align-middle">{{ OrderInfo.Dimension_Width }} ({{ OrderInfo.Dimension_Width/10 }})</td>
              <td class="text-center align-middle">{{ OrderInfo.Dimension_Height }} </td>
              <td class="text-center align-middle">{{ OrderInfo.Quantity_EA }} </td>
              <td class="text-center align-middle">{{ OrderInfo.Quantity_M2 }} </td>
              <td class="text-center align-middle">{{ OrderInfo.Order_Name }} </td>
              <td class="text-center align-middle">{{ OrderInfo.WorkerName }}
                <br v-if="OrderInfo.WorkerName2 !== null && OrderInfo.WorkerName2.length > 0">
                <span v-if="OrderInfo.WorkerName2 !== null && OrderInfo.WorkerName2.length > 0">({{ OrderInfo.WorkerName2 }})</span>
              </td>
              <td class="text-center align-middle text-danger">{{ OrderInfo.State }} </td>
              <td class="text-center align-middle">{{ OrderInfo.ProcessTime }} </td>
              <td class="text-center align-middle">{{ OrderInfo.RegisterTime }} </td>
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
  import Datepicker from '@vuepic/vue-datepicker';
  // 인스턴스 할당
  const AppInstance = getCurrentInstance()
  // 전역변수 할당
  let GLOBAL_PROPERTY = AppInstance.appContext.config.globalProperties
  // 내부변수 할당
  let DataPicker_Start = ref( new Date() )
  let DataPicker_Finish = ref( new Date() )
  let OrderList = ref( [] )
  // 이벤트 설정
  onMounted(() => {
    LogManager.w( "Order_OrderList", 'onMounted()' )
    DisplayLayout_Default()
  })
  // 내부 함수
  function DisplayLayout_Default() {
  }
</script>

<script>
export default {
  name: 'Order_OrderList',
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
  font-size: 97%;
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
  font-size: 85%;
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
