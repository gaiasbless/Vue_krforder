<template>
  <div class="w-100 d-flex flex-column p-2" style="min-width: 900px">

    <div class="d-flex flex-row">
      <img class="mt-1 me-2" src="@bootstrap-icons/icons/Telephone-outbound.svg" width="18" height="18">
      <h5><b>발주 등록</b></h5>
    </div>

    <span class="text-info" style="font-size: 80%; text-decoration: underline;">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="align-text-bottom bi bi-star" viewBox="0 0 16 16">
        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
      </svg>
      등록된 전체 발주 목록이 출력 됩니다.
    </span>

    <form class="px-4" style="width: 900px" v-on:submit.prevent="API_SignIn" autocomplete="off">
      <div class="row mt-4 text-center">
        <span class="fs-3"><b>발&nbsp;&nbsp;&nbsp;&nbsp;주&nbsp;&nbsp;&nbsp;&nbsp;서</b></span>
      </div>
      <div class="row mt-1">
        <div class="col p-0">
          <span class="ps-1">발주번호 : 012345678</span>
        </div>
        <div class="col p-0 text-end">
          <span class="">발주일자 : {{ OrderInfo.OrderDate_Display }}</span>
        </div>
      </div>
      <div class="row border border-dark border-2">
        <div class="col p-1 d-flex flex-column border border-top-0 border-bottom-0 border-start-0 border-end-2 border-dark">
          <div class="row">
            <div class="col">
              <img class="mt-0 ms-2 me-2" src="@bootstrap-icons/icons/telephone-outbound-fill.svg" width="18" height="18">
              <span class="fs-5">발신</span>
            </div>
            <div class="col">
            </div>
          </div>
          <span class="mt-2 ms-4 order_text_large fw-bold">코리아라벨</span>
          <span class="mt-0 ms-4 order_text_small">서울특별시 중구 창경궁로8</span>
          <span class="mt-0 ms-4 order_text_small">tel: (02)000-0000</span>
          <span class="mt-0 ms-4 order_text_small">fax: (02)000-0000</span>
          <span class="mt-3 ms-4 fw-bold">담당자 : 김영민 과장님</span>
          <span class="mt-0 ms-4 order_text_small">mobile: 010-0000-0000</span>
        </div>
        <div class="col p-1 d-flex flex-column text-end">
          <div class="row">
            <div class="col text-start">
              <img class="mt-0 ms-2 me-2" src="@bootstrap-icons/icons/telephone-inbound-fill.svg" width="18" height="18">
              <span class="fs-5">수신</span>
            </div>
            <div class="col">
              업체선택
            </div>
          </div>
          <span class="mt-2 me-4 order_text_large fw-bold">코리아라벨</span>
          <span class="mt-0 me-4 order_text_small">서울특별시 중구 창경궁로8</span>
          <span class="mt-0 me-4 order_text_small">tel: (02)000-0000</span>
          <span class="mt-0 me-4 order_text_small">fax: (02)000-0000</span>
          <span class="mt-3 me-4 fw-bold">담당자 : 김영민 과장님</span>
          <span class="mt-0 me-4 order_text_small">mobile: 010-0000-0000</span>
        </div>
      </div>

      <div class="row border-2 mt-2" style="height: 35px">
        <div class="order_table_title col1">
          <span class="">순번</span>
        </div>
        <div class="order_table_title col2">
          <span class="">제품코드</span>
        </div>
        <div class="col order_table_title col3">
          <span class="">제품명</span>
        </div>
        <div class="order_table_title col4">
          <span class="">규격</span>
        </div>
        <div class="order_table_title col5">
          <span class="">수량</span>
        </div>
        <div class="order_table_title col6">
          <span class="">단위수량(롤)</span>
        </div>
      </div>

      <div class="row mt-2">
        <input class="form-control" id="Input_Password" type="password" placeholder="비밀번호" v-model="OrderInfo.ProductName" required/>
      </div>
      <div class="row mt-2">
        <button class="btn btn-outline-primary" type="submit">로그인</button>
      </div>
    </form>

  </div>
</template>

<script setup>
  // 인스턴스 생성
  import { getCurrentInstance, ref, shallowRef, onMounted } from 'vue'
  import moment from 'moment'
  import LogManager from '@/utility/LogManager'
  // 인스턴스 할당
  const AppInstance = getCurrentInstance()
  // 전역변수 할당
  let GLOBAL_PROPERTY = AppInstance.appContext.config.globalProperties
  // 내부변수 할당
  let CompanyInfo = ref( {} )
  let OrderInfo = ref( {
    UserIndex: 0,
    CompanyIndex: 0,
    OrderDate: moment( new Date(), "YYYY-MM-DD", true ).format( "YYYY-MM-DD" ),
    OrderDate_Display: moment( new Date(), "YYYY-MM-DD", true ).format( "YYYY년 M월 D일" ),
    ProductCode: "",
    ProductName: "",
    Dimenstion_Width: 0,
    Dimenstion_Height: 0,
    Dimension_Message: "",
    Quantity: 0,
    Quantity_Unit: "",
    Purpose: "",
    ExtraMessage: ""
  } )
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
.order_text_large {
  font-size: 130%;
}
.order_text_small {
  font-size: 90%;
}
.order_table_title {
  background-color: #c3c3c3;
  font-size: 90%;

}
.order_table_cell {
  background-color: #ffffff;
  font-size: 90%;
}
.col1 {
  width: 60px;
  border-top: 2px solid black;
  border-left: 2px solid black;
  border-right: 2px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
}
.col2 {
  width: 120px;
  border-top: 2px solid black;
  border-right: 2px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
}
.col3 {
  border-top: 2px solid black;
  border-right: 2px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
}
.col4 {
  width: 200px;
  border-top: 2px solid black;
  border-right: 2px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
}
.col5 {
  width: 100px;
  border-top: 2px solid black;
  border-right: 2px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
}
.col6 {
  width: 120px;
  border-top: 2px solid black;
  border-right: 2px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
