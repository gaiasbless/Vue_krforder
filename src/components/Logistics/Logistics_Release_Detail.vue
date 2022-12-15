<template>
  <div class="w-100 d-flex flex-column p-2 align-items-center" style="min-width: 900px">

    <div class="mt-3 d-flex flex-row">
      <img class="mt-1 me-2" src="@bootstrap-icons/icons/truck.svg" width="18" height="18">
      <h5><b>출고 대기 상세내역</b></h5>
    </div>

    <form class="mt-2 px-4" style="width: 900px" v-on:submit.prevent="" autocomplete="off">
      <div class="row mt-1">
        <div class="col p-0">
          <span class="fw-bold ps-1">발주번호 : {{ OrderInfo[0].OrderNumber }}</span>
        </div>
        <div class="col p-0 text-end">
          <span class="fw-bold">발주일자 : {{ OrderInfo[0].RegisterDate }}</span>
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
          </div>
          <span class="mt-2 me-4 order_text_large fw-bold">{{ ReceiveCompanyInfo[0].CompanyName }}</span>
          <span class="mt-0 me-4 order_text_small">{{ ReceiveCompanyInfo[0].Address }}</span>
          <span class="mt-0 me-4 order_text_small" v-if="ReceiveCompanyInfo[0].Telephone !== null">유선전화: {{ ReceiveCompanyInfo[0].Telephone }}</span>
          <span class="mt-0 me-4 order_text_small" v-if="ReceiveCompanyInfo[0].Fax !== null">팩스: {{ ReceiveCompanyInfo[0].Fax }}</span>
          <span class="mt-3 me-4 fw-bold">담당자 : {{ ReceiveCompanyInfo[0].ManagerName }}</span>
          <span class="mt-0 me-4 order_text_small">휴대전화: {{ ReceiveCompanyInfo[0].MobilePhone }}</span>
          <span class="mt-0 me-4 order_text_small" v-if="ReceiveCompanyInfo[0].Email !== null">이메일: {{ ReceiveCompanyInfo[0].Email }}</span>
        </div>
      </div>

      <div class="row mt-2">
        <table class="border border-dark border-2">
          <tr>
            <td class="table_title table_col1">순번</td>
            <td class="table_title table_col2">제품코드</td>
            <td class="table_title table_col3">제품명</td>
            <td class="table_title table_col4">규격</td>
            <td class="table_title table_col5">총수량</td>
            <td class="table_title table_col6">수량/롤</td>
            <td class="table_title table_col7">수량/포장</td>
          </tr>
          <!-- 제품 순번 1 -->
          <tr>
            <td class="table_cell fw-bold" rowspan="3">1</td>
            <td class="table_cell">{{ OrderInfo[0].ProductCode }}</td>
            <td class="table_cell">{{ OrderInfo[0].ProductName }}</td>
            <td class="table_cell">가로 : {{ OrderInfo[0].Dimension_Width }}mm / 세로 : {{ OrderInfo[0].Dimension_Height }}mm</td>
            <td class="table_cell">{{ NumberFormat( OrderInfo[0].Quantity ) }}</td>
            <td class="table_cell">{{ NumberFormat( OrderInfo[0].Quantity_Unit ) }}</td>
            <td class="table_cell">{{ NumberFormat( Math.floor(OrderInfo[0].Quantity / OrderInfo[0].Quantity_Unit) + (OrderInfo[0].Quantity % OrderInfo[0].Quantity_Unit > 0 ? 1 : 0) ) }}</td>
          </tr>
          <tr>
            <td class='table_cell ps-3' style='text-align: start;' colspan='6'>요청사항 : {{ OrderInfo[0].Request_Message }}</td>
          </tr>
          <tr>
            <td class='table_cell ps-3' style='text-align: start;' colspan='6'>용&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;도 : {{ OrderInfo[0].Purpose }}</td>
          </tr>
        </table>
      </div>

      <!-- 납기 요청일 -->
      <div class="row mt-2">
        <table>
          <tr>
            <td class="table_title" style="width: 100px">납기 요청일</td>
            <td class="table_cell align-top text-start p-2">{{ OrderInfo[0].RequestDeliverDate }}</td>
          </tr>
        </table>
      </div>
      <!-- 비고 입력 -->
      <div class="row mt-2">
        <table style="min-height: 150px">
          <tr>
            <td class="table_title text-center" style="width: 100px">비고</td>
            <td class="table_cell align-top text-start p-2">
              <span v-html="String(OrderInfo[0].ExtraMessage).replace( '\n', '<br>' )"></span>
            </td>
          </tr>
        </table>
      </div>

      <!-- 출고 수량 설정 -->
      <div class="row mt-2">
        <span class="fw-bold fs-6 ps-0">입고 수량 설정</span>
        <table>
          <tr>
            <td class="table_title" style="width: 100px">출고 가능 수량</td>
            <td class="table_cell align-top text-start p-2 fw-bold fs-6 text-danger">{{ NumberFormat( OrderInfo[0].Quantity_Left ) }}</td>
          </tr>
          <tr>
            <td class="table_title" style="width: 100px">출고 수량</td>
            <td class="table_cell align-top text-start">
              <input class="form-control table_input ps-2 fw-bold fs-6" type="text" placeholder="출고 수량을 입력하세요" v-model="ReleaseQuantity" v-on:keypress="InputLimit_OnlyNumber($event)" required/>
            </td>
          </tr>
        </table>
      </div>

      <div class="row mt-4 mb-5">
        <div class="col d-flex align-items-center justify-content-center">
          <button class="btn btn-outline-success fw-bold px-4 me-2" type="button" v-on:click="SetReleaseQuantity()">출고</button>
          <button class="btn btn-outline-secondary px-4 ms-2" type="button" v-on:click="router.go( -1 )">취소</button>
        </div>
      </div>
    </form>

  </div>

</template>

<script setup>
  // 외부데이터 전달
  const Props = defineProps( { OrderIndex:{ Type: Number, default : 0 } } )
  // 인스턴스 생성
  import { getCurrentInstance, ref, shallowRef, onMounted, onBeforeUnmount, watch } from 'vue'
  import router from '@/router'
  import moment from 'moment'
  import LogManager from '@/utility/LogManager'
  import * as bootstrap from 'bootstrap'
  // 인스턴스 할당
  const AppInstance = getCurrentInstance()
  const AxiosInstance = AppInstance.appContext.config.globalProperties.$axios
  // 전역변수 할당
  let GLOBAL_PROPERTY = AppInstance.appContext.config.globalProperties
  // 내부변수 할당
  let OrderCompanyInfo = ref( [{}] )
  let ReceiveCompanyInfo = ref( [{}] )
  let OrderInfo = ref( [{}] )
  let ReleaseQuantity = ref( 0 )
  // 이벤트 설정
  onMounted(() => {
    LogManager.w( "Logistics_Store_Detail", 'onMounted()', 'Props', JSON.stringify( Props ) )
    DisplayLayout_Default()
  })
  // 레이아웃 출력 - 기본
  function DisplayLayout_Default() {
    API_GetWaitReleaseDetail()
  }
  // 입력제한 - 숫자만
  function InputLimit_OnlyNumber( Event ) {
    let char = String.fromCharCode( Event.keyCode )
    if( /^[0-9]+$/.test( char ) ) return true
    else Event.preventDefault()
  }
  // 숫자 포맷 설정 (구분자 콤마 표시)
  function NumberFormat( Number ) {
    return String( Number ).replace( /\B(?=(\d{3})+(?!\d))/g, "," )
  }
  // 입고 설정
  function SetReleaseQuantity() {
    if( String(ReleaseQuantity.value).length == 0 ) alert( "출고 수량이 입력되지 않았습니다." )
    else if( ReleaseQuantity.value <= 0 ) alert( "출고 수량은 0보다 커야 합니다." )
    else if( Number(OrderInfo.value[0].Quantity_Left) < Number(ReleaseQuantity.value) ) alert( "출고 수량이 출고가능 수량보다 큽니다.\n확인 후 다시 진행해 주세요." )
    else if( confirm( "출고 수량을 입력 할까요?" ) ) API_SetReleaseQuantity()
  }
  // API 요청 - 입고 대기 품목 상세정보 수집
  function API_GetWaitReleaseDetail() {
    var PostParams = new URLSearchParams();
    PostParams.append( 'ORDER_INDEX', Props.OrderIndex );
    LogManager.w( AppInstance?.type.__name, "API_GetWaitReleaseDetail()", "Parameter", PostParams.toString() )
    AxiosInstance.post( "/api/Logistics/Release/GetWaitReleaseDetail.php", PostParams )
    .then(response => {
      LogManager.w( AppInstance?.type.__name, "API_GetWaitReleaseDetail()", "Result", JSON.stringify( response.data ) )
      if( response.data.success > 0 ) {
        OrderInfo.value = response.data.data
        OrderCompanyInfo.value = response.data.OrderCompany
        ReceiveCompanyInfo.value = response.data.ReceiveCompany
        ReleaseQuantity.value = OrderInfo.value[0].Quantity_Left
      }
      else if( response.data.success == -10 ) {
        alert( "입고 수량 읽기 권한이 없습니다." )
        router.go( -1 )
      }
      else if( response.data.success == -1000 ) {
        alert( "인증키 오류가 발생 되었습니다. 로그인 후 사용해 주세요." )
        GLOBAL_PROPERTY.$SignInState = false
        router.push( "/" )
      }
      else alert( "서버 요청 오류 - 잠시 후 다시 시도해 주세요" )
    })
    .catch(ex => {
      LogManager.w( AppInstance?.type.__name, "API_GetWaitReleaseDetail()", "서버 요청 오류", ex )
      alert( "서버 요청 오류 - 잠시 후 다시 시도해 주세요" )
    })
  }
  // API 요청 - 입고 수량 설정
  function API_SetReleaseQuantity() {
    var PostParams = new URLSearchParams();
    PostParams.append( 'ORDER_INDEX', Props.OrderIndex );
    PostParams.append( 'RELEASE_QUANTITY', ReleaseQuantity.value );
    LogManager.w( AppInstance?.type.__name, "API_SetReleaseQuantity()", "Parameter", PostParams.toString() )
    AxiosInstance.post( "/api/Logistics/Release/SetReleaseQuantity.php", PostParams )
    .then(response => {
      LogManager.w( AppInstance?.type.__name, "API_SetReleaseQuantity()", "Result", JSON.stringify( response.data ) )
      if( response.data.success == 1 ) {
        alert( "출고 수량이 정상 입력 되었습니다." )
        router.go( -1 )
      }
      else if( response.data.success == -10 ) {
        alert( "출고 수량 등록 권한이 없습니다." )
        router.go( -1 )
      }
      else if( response.data.success == -1000 ) {
        alert( "인증키 오류가 발생 되었습니다. 로그인 후 사용해 주세요." )
        GLOBAL_PROPERTY.$SignInState = false
        router.push( "/" )
      }
      else alert( "서버 요청 오류 - 잠시 후 다시 시도해 주세요" )
    })
    .catch(ex => {
      LogManager.w( AppInstance?.type.__name, "API_SetReleaseQuantity()", "서버 요청 오류", ex )
      alert( "서버 요청 오류 - 잠시 후 다시 시도해 주세요" )
    })
  }
</script>

<script>
export default {
  name: 'Logistics_Store_Detail',
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
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css");
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
  height: 35px;
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
.table_col1 { width: 40px }
.table_col2 { width: 200px }
.table_col3 { }
.table_col4 { width: 217px }
.table_col5 { width: 80px }
.table_col6 { width: 70px }
.table_col7 { width: 70px }
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
