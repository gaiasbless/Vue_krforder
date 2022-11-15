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
      <div class="row mt-3 text-center">
        <span class="fs-2"><b>발&nbsp;&nbsp;&nbsp;&nbsp;주&nbsp;&nbsp;&nbsp;&nbsp;서</b></span>
      </div>
      <div class="row mt-1">
        <div class="col p-0">
          <span class="ps-1">발주번호 : {{ ReceiveCompanyInfo[0].OrderNumber }}</span>
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
              <span class="fs-5 fw-bold">발신</span>
            </div>
            <div class="col">
            </div>
          </div>
          <span class="mt-2 ms-4 order_text_large fw-bold">{{ OrderCompanyInfo[0].CompanyName }}</span>
          <span class="mt-0 ms-4 order_text_small">{{ OrderCompanyInfo[0].Address }}</span>
          <span class="mt-0 ms-4 order_text_small" v-if="OrderCompanyInfo[0].Telephone !== null">유선전화: {{ OrderCompanyInfo[0].Telephone }}</span>
          <span class="mt-0 ms-4 order_text_small" v-if="OrderCompanyInfo[0].Fax !== null">팩스: {{ OrderCompanyInfo[0].Fax }}</span>
          <span class="mt-3 ms-4 fw-bold">담당자 : {{ OrderCompanyInfo[0].ManagerName }}</span>
          <span class="mt-0 ms-4 order_text_small">휴대전화: {{ OrderCompanyInfo[0].MobilePhone }}</span>
          <span class="mt-0 ms-4 order_text_small">이메일: {{ OrderCompanyInfo[0].Email }}</span>
        </div>
        <div class="col p-1 d-flex flex-column text-end">
          <div class="row">
            <div class="col text-start">
              <img class="mt-0 ms-2 me-2" src="@bootstrap-icons/icons/telephone-inbound-fill.svg" width="18" height="18">
              <span class="fs-5 fw-bold">수신</span>
            </div>
            <div class="col">
              <button class="btn btn-primary" style="width: 80px; padding: 3px; font-size: 90%;" type="button" v-on:click="DisplayDialog_SelectCompany">업체선택</button>
            </div>
          </div>
          <span class="mt-2 me-4 order_text_large fw-bold">{{ ReceiveCompanyInfo[0].CompanyName }}</span>
          <span class="mt-0 me-4 order_text_small">{{ ReceiveCompanyInfo[0].Address }}</span>
          <span class="mt-0 me-4 order_text_small" v-if="ReceiveCompanyInfo[0].Telephone !== null">유선전화: {{ ReceiveCompanyInfo[0].Telephone }}</span>
          <span class="mt-0 me-4 order_text_small" v-if="ReceiveCompanyInfo[0].Fax !== null">팩스: {{ ReceiveCompanyInfo[0].Fax }}</span>
          <span class="mt-3 me-4 fw-bold">담당자 : {{ ReceiveCompanyInfo[0].ManagerName }}</span>
          <span class="mt-0 me-4 order_text_small">휴대전화: {{ ReceiveCompanyInfo[0].MobilePhone }}</span>
          <span class="mt-0 ms-4 order_text_small">이메일: {{ ReceiveCompanyInfo[0].Email }}</span>
        </div>
      </div>

      <div class="row mt-2">
        <table class="border border-dark border-2">
          <tr>
            <td class="table_title" style="width: 50px">순번</td>
            <td class="table_title" style="width: 210px">제품코드</td>
            <td class="table_title" style="width: 207px">제품명</td>
            <td class="table_title" style="width: 180px">규격</td>
            <td class="table_title" style="width: 90px">수량</td>
            <td class="table_title">단위수량(롤)</td>
          </tr>
          <tr>
            <td class="table_cell fw-bold" style="width: 50px" rowspan="3">1</td>
            <td class="table_cell" style="width: 210px">
              <input class="form-control table_input" id="Input_ProductCode" type="text" placeholder="제품코드 필수입력" v-model="OrderInfo.ProductCode_01" v-on:click="DisplayDialog_SelectProduct" readonly required/>
            </td>
            <td class="table_cell" style="width: 207px">
              <input class="form-control table_input" id="Input_ProductName" type="text" placeholder="제품명 자동 입력" v-model="OrderInfo.ProductName_01" readonly required/>
            </td>
            <td class="table_cell" style="width: 180px">규격</td>
            <td class="table_cell" style="width: 70px">
              <input class="form-control table_input text-center" id="Input_ProductCode" type="text"  placeholder="수량 필수" v-model="OrderInfo.Quantity_01" v-on:keypress="InputLimit_OnlyNumber($event)" v-on:keydown.enter="SetFormNextFocus" required/>
            </td>
            <td class="table_cell">
            </td>
          </tr>
          <tr>
            <td class="table_cell" colspan="5">
              <div class="row">
                <div class="col-md-auto ps-4 pe-1 d-flex align-items-center" style="font-size: 110%">
                  <span>요청사항 :</span>
                </div>
                <div class="col ms-0 ps-0">
                  <input class="form-control table_input ps-1" style="font-size: 115%" id="Input_ProductRequire" type="text" placeholder="요청사항 선택 입력" v-model="OrderInfo.ProductCode"/>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td class="table_cell" colspan="5">
              <div class="row">
                <div class="col-md-auto ps-4 pe-1 d-flex align-items-center" style="font-size: 110%">
                  <span>용&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;도 :</span>
                </div>
                <div class="col ms-0 ps-0">
                  <input class="form-control table_input ps-1" style="font-size: 115%" id="Input_ProductRequire" type="text" placeholder="용도 선택 입력" v-model="OrderInfo.ProductCode"/>
                </div>
              </div>
            </td>
          </tr>
        </table>
        <!-- 추가 버튼 영역 -->
        <div class="row mt-1 mb-1">
          <div class="col text-center">
            <button class="btn btn-primary" style="width: 50px; padding: 3px; font-size: 90%;" type="button">추가</button>
          </div>
        </div>
      </div>

      <div class="row">
        <table>
          <tr>
            <td class="table_cell fw-bold" style="width: 50px" rowspan="3">2</td>
            <td class="table_cell" style="width: 210px">
              <input class="form-control table_input" id="Input_ProductCode" type="text" placeholder="제품코드 필수입력" v-model="OrderInfo.ProductCode" required/>
            </td>
            <td class="table_cell" style="width: 207px">
              <input class="form-control table_input" id="Input_ProductName" type="text" placeholder="제품명 자동 입력" v-model="OrderInfo.ProductName" readonly required/>
            </td>
            <td class="table_cell" style="width: 180px">규격</td>
            <td class="table_cell" style="width: 70px">수량</td>
            <td class="table_cell">단위수량(롤)</td>
          </tr>
          <tr>
            <td class="table_cell" colspan="5">
              <div class="row">
                <div class="col-md-auto ps-4 pe-1 d-flex align-items-center" style="font-size: 110%">
                  <span>요청사항</span>
                </div>
                <div class="col ms-0 ps-0">
                  <input class="form-control table_input ps-1" style="font-size: 115%" id="Input_ProductRequire" type="text" placeholder="요청사항 선택 입력" v-model="OrderInfo.ProductCode"/>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td class="table_cell" colspan="5">
              <div class="row">
                <div class="col-md-auto ps-4 pe-1 d-flex align-items-center" style="font-size: 110%">
                  <span>용&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;도</span>
                </div>
                <div class="col ms-0 ps-0">
                  <input class="form-control table_input ps-1" style="font-size: 115%" id="Input_ProductRequire" type="text" placeholder="용도 선택 입력" v-model="OrderInfo.ProductCode"/>
                </div>
              </div>
            </td>
          </tr>
        </table>
        <!-- 추가 삭제 버튼 영역 -->
        <div class="row mt-1 mb-1">
          <div class="col text-center">
            <button class="btn btn-primary" style="width: 50px; padding: 3px; font-size: 90%;" type="button">추가</button>
            <button class="btn btn-primary ms-1" style="width: 50px; padding: 3px; font-size: 90%;" type="button">삭제</button>
          </div>
        </div>
      </div>

      <!-- 납기 요청일 -->
      <div class="row mt-2">
        <table>
          <tr>
            <td class="table_title" style="width: 100px">납기 요청일</td>
            <td class="table_cell">
              <Datepicker inputClassName="dp-custom-input" v-model="OrderInfo.RequestDeliverDate" ref="Datepicker_RequestDeliverDate" placeholder="납기 요청일 선택 입력" format="yyyy-MM-dd" locale="ko" :enableTimePicker="false" :clearable="true" autoApply></Datepicker>
            </td>
          </tr>
        </table>
      </div>

      <!-- 비고 입력 -->
      <div class="row mt-3">
        <table style="min-height: 150px">
          <tr>
            <td class="table_title" style="width: 100px">비고</td>
            <td class="table_cell">
              <textarea class="form-control" v-model="OrderInfo.ExtraMessage" id="floatingTextarea2" style="height: 150px; border: none;"></textarea>
            </td>
          </tr>
        </table>
      </div>

      <div class="row mt-4 mb-5 d-flex align-items-center justify-content-center">
        <button class="col-4 btn btn-primary" type="submit">발주서 등록</button>
      </div>
    </form>

    <!-- 다이얼로그 -->
    <component v-bind:is="Component_Content" v-bind:key="Component_Content" v-on:Event_ReturnResult="Event_ReturnResult"></component>
  </div>

</template>

<script setup>
  import '@vuepic/vue-datepicker/dist/main.css'
  import Dialog_SelectCompany from '@/components/Common/Dialog_SelectCompany.vue'
  import Dialog_SelectProduct from '@/components/Common/Dialog_SelectProduct.vue'
  // 인스턴스 생성
  import { getCurrentInstance, ref, shallowRef, onMounted, onBeforeUnmount } from 'vue'
  import moment from 'moment'
  import LogManager from '@/utility/LogManager'
  import Datepicker from '@vuepic/vue-datepicker'
  import * as bootstrap from 'bootstrap'
  // 인스턴스 할당
  const AppInstance = getCurrentInstance()
  const AxiosInstance = AppInstance.appContext.config.globalProperties.$axios
  // 전역변수 할당
  let GLOBAL_PROPERTY = AppInstance.appContext.config.globalProperties
  // 내부변수 할당
  let Component_Content = shallowRef( null )
  let OrderCompanyInfo = ref( [{}] )
  let ReceiveCompanyInfo = ref( [{}] )
  let OrderInfo = ref( {
    OrderCompanyIndex: 0,
    ReceiveCompanyIndex: 0,
    ReceiveManagerIndex: 0,
    OrderDate: moment( new Date(), "YYYY-MM-DD", true ).format( "YYYY-MM-DD" ),
    OrderDate_Display: moment( new Date(), "YYYY-MM-DD", true ).format( "YYYY년 M월 D일" ),
    ProductCode_01: "",
    ProductName_01: "",
    Dimenstion_Width_01: 0,
    Dimenstion_Height_01: 0,
    RequestMessage_01: "",
    Quantity_01: null,
    Quantity_Unit_01: "",
    Purpose_01: "",
    RequestDeliverDate: "",
    ExtraMessage: ""
  } )
  // 이벤트 설정
  onMounted(() => {
    LogManager.w( "Order_Register", 'onMounted()' )
    DisplayLayout_Default()
  })
  onBeforeUnmount(() => {
    LogManager.w( "Order_Register", 'onBeforeUnmount()' )
    Component_Content.value = null
  })
  // 레이아웃 출력 - 기본
  function DisplayLayout_Default() {
    // API 요청 - 발주회사 정보 수집
    API_GetOrderCompanyInfo()
    // API 요청 - 수신회사 정보 수집 (기본값 코리아 라벨, 김영민 과장 적용)
    API_GetReceiveCompanyInfo( 2, 2 )
  }
  // 다이얼로그 출력 - 업체선택
  function DisplayDialog_SelectCompany() {
    Component_Content.value = Dialog_SelectCompany
  }
  // 다이얼로그 출력 - 제품선택
  function DisplayDialog_SelectProduct() {
    Component_Content.value = Dialog_SelectProduct
  }
  // 입력제한 - 숫자만
  function InputLimit_OnlyNumber( Event ) {
    let char = String.fromCharCode( Event.keyCode )
    if( /^[0-9]+$/.test( char ) ) return true
    else Event.preventDefault()
  }
  // 업체선택 결과 반영
  function Event_ReturnResult( ResultType, Value1, Value2 ) {
    LogManager.w( "Order_Register", "Event_ReturnResult" ,"반환데이터", ResultType + " / " + Value1 + " / " + Value2 )
    if( ResultType === "Result_SelectCompany" ) {
      if( Value1 > 0 && Value2 > 0 ) API_GetReceiveCompanyInfo( Value1, Value2 )
      Component_Content.value = null
    }
  }
  // API 요청 - 발주회사 정보 수집
  function API_GetOrderCompanyInfo() {
    var PostParams = new URLSearchParams();
    PostParams.append( 'COMPANY_INDEX', 1 );        // 발주회사 색인번호는 KRF - 1 고정값 호출
    LogManager.w( AppInstance?.type.__name, "API_GetOrderCompanyInfo()", "Parameter", PostParams.toString() )
    AxiosInstance.post( "/api/Order/Register/GetOrderCompanyInfo.php", PostParams )
    .then(response => {
      LogManager.w( AppInstance?.type.__name, "API_GetOrderCompanyInfo()", "Result", JSON.stringify( response.data ) )
      if( response.data.success > 0 ) {
        OrderCompanyInfo.value = response.data.data
      }
      else alert( "서버 요청 오류 - 잠시 후 다시 시도해 주세요" )
    })
    .catch(ex => {
      LogManager.w( AppInstance?.type.__name, "API_GetOrderCompanyInfo()", "서버 요청 오류", ex )
      alert( "서버 요청 오류 - 잠시 후 다시 시도해 주세요" )
    })
  }
  // API 요청 - 수신회사 정보 수집
  function API_GetReceiveCompanyInfo( CompanyIndex, ManagerIndex ) {
    var PostParams = new URLSearchParams();
    PostParams.append( 'COMPANY_INDEX', CompanyIndex )
    PostParams.append( 'MANAGER_INDEX', ManagerIndex )        // 수신회사 매니저 기본값 2 적용 (김영민 과장)
    LogManager.w( AppInstance?.type.__name, "API_GetReceiveCompanyInfo()", "Parameter", PostParams.toString() )
    AxiosInstance.post( "/api/Order/Register/GetReceiveCompanyInfo.php", PostParams )
    .then(response => {
      LogManager.w( AppInstance?.type.__name, "API_GetReceiveCompanyInfo()", "Result", JSON.stringify( response.data ) )
      if( response.data.success > 0 ) {
        ReceiveCompanyInfo.value = response.data.data
        OrderInfo.value.ReceiveCompanyIndex = response.data.data[0].idx
        OrderInfo.value.ReceiveManagerIndex = response.data.data[0].ManagerIndex
      }
      else alert( "서버 요청 오류 - 잠시 후 다시 시도해 주세요" )
    })
    .catch(ex => {
      LogManager.w( AppInstance?.type.__name, "API_GetReceiveCompanyInfo()", "서버 요청 오류", ex )
      alert( "서버 요청 오류 - 잠시 후 다시 시도해 주세요" )
    })
  }
</script>

<script>
export default {
  name: 'Order_Register',
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
.table_title {
  height: 35px;
  background-color: #c3c3c3;
  font-size: 85%;
  font-weight: bold;
  text-align: center;
  border: 2px solid black;
}
.table_cell {
  /* padding-top: 3px; */
  /* padding-bottom: 3px; */
  font-size: 85%;
  text-align: center;
  border: 2px solid black;
}
.table_input {
  border: none;
  font-size: 110%;
  input:placeholder {
    color: red;
  }
}
input::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: #9bb7ff;
  opacity: 1; /* Firefox */
}

input::-ms-input-placeholder { /* Internet Explorer 10-11 */
  color: #5786ff;
}

input::-ms-input-placeholder { /* Microsoft Edge */
  color: #5786ff;
}
</style>

<style lang="scss">
.dp-custom-input {
  box-shadow: 0 0 0px #1976d2;
  // color: #ffffff;
  border-color: #ffffff;
  // border: none;

  &:hover {
    border-color: #1976d2;
  }
}
</style>
