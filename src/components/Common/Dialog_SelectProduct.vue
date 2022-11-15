<template>
  <div class="modal fade" id="DialogHandler" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
      <div class="modal-content p-4">
        <div class="row px-2">
          <div class="col">
            <b class="fs-5">제품 선택</b>
          </div>
          <div class="col text-end">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
        </div>

        <div class="row mt-3 ps-2 pe-4">
          <div class="col-md-auto d-flex align-items-center justify-content-cente">
            제품 검색
          </div>
          <div class="col ms-0 ps-0">
            <input class="form-control table_input" ref="Input_SearchText" id="Input_SearchText" type="text" placeholder="제품코드 또는 제품명 입력" v-on:input="SearchText=$event.target.value" autocomplete="off" autofocus/>
          </div>
        </div>

        <div class="modal-body mt-3 py-0 px-1">
          <table class="table table-hover" style="height: 500px;">
            <thead class="table-secondary">
              <tr>
                <th class="col-3 text-center">제품코드</th>
                <th class="col text-center">제품명</th>
                <th class="col-1 text-center">형식</th>
                <th class="col-1 text-center">단위</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="ProductInfo in ProductList" v-bind:key="ProductInfo.Code" v-on:click="Event_Click_SelectCompany( CompanyInfo.CompanyIndex, CompanyInfo.ManagerIndex )">
                <td class="text-center fw-bold">{{ ProductInfo.Code }}</td>
                <td class="text-center fw-bold">{{ ProductInfo.Name }}</td>
                <td class="text-center">{{ ProductInfo.Type }}</td>
                <td class="text-center">{{ ProductInfo.Unit }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="row mt-4">
          <div class="col text-end">
            <button class="btn btn-outline-secondary" style="width: 100px" type="button" data-bs-dismiss="modal">취소</button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
  // 외부데이터 전달
  const Props = defineProps({
    RefreshCount:{ Type: Number },
  })
  // 외부데이터 반환
  const Emits = defineEmits( [ "Event_ReturnResult" ] )
  // 인스턴스 생성
  import { getCurrentInstance, ref, onMounted, onUpdated, onBeforeUnmount, watch } from 'vue'
  import LogManager from '@/utility/LogManager'
  import * as bootstrap from 'bootstrap'
  // 인스턴스 할당
  const AppInstance = getCurrentInstance()
  const AxiosInstance = AppInstance.appContext.config.globalProperties.$axios
  // 전역변수 할당
  let GLOBAL_PROPERTY = AppInstance.appContext.config.globalProperties
  // 내부변수 할당
  let DialogInstance = null
  let SearchText = ref( "" )
  let ProductList = ref( [] )
  let Input_SearchText = ref( null )
  let PreviousTime = 0
  // 이벤트 설정
  onMounted(() => {
    LogManager.w( AppInstance?.type.__name, 'onMounted()', 'Props', JSON.stringify( Props ) )
    DisplayLayout_Default()
  })
  onUpdated(() => {
    LogManager.w( AppInstance?.type.__name, 'onUpdated()' )
  })
  onBeforeUnmount(() => {
    LogManager.w( AppInstance?.type.__name, 'onBeforeUnmount()' )
    DialogInstance.hide()
  })
  // 감시자 설정
  watch( SearchText, ( NewValue, OldValue ) => {
    LogManager.w( AppInstance?.type.__name, "Watch", "SearchText", "NewValue => " + NewValue + " / OldValue => " + OldValue )
    setTimeout( function() {
      if( new Date().getTime() > PreviousTime + 800 ) {
        if( SearchText.value.length == 0 ) ProductList.value = [{}]
        else API_GetProductList()
      }
    }, 800 )
    PreviousTime = new Date().getTime()
  } )
  // 레이아웃 출력 - 기본
  function DisplayLayout_Default() {
    DialogInstance = new bootstrap.Modal( "#DialogHandler", { focus: true, keyboard: true })
    // 부트스트랩 모달창 닫기 이벤트 핸틀러
    document.getElementById('DialogHandler').addEventListener('hidden.bs.modal', event => {
      Emits( "Event_ReturnResult", "Result_SelectCompany", 0, 0 )
    })
    DialogInstance.show()
    // 포커스 설정
    setTimeout( function() { Input_SearchText.value.focus() }, 500 )
  }
  function Event_Click_SelectCompany( CompanyIndex, ManagerIndex ) {
    DialogInstance.hide()
    Emits( "Event_ReturnResult", "Result_SelectProduct", CompanyIndex, ManagerIndex )
  }

  function UpdateProductList() {

  }
  // API 요청 - 제품 목록 수집
  function API_GetProductList() {
    var PostParams = new URLSearchParams();
    PostParams.append( 'SEARCH_TEXT', SearchText.value );
    LogManager.w( AppInstance?.type.__name, "API_GetProductList()", "Parameter", PostParams.toString() )
    AxiosInstance.post( "/api/Service/GetProductList.php", PostParams )
    .then(response => {
      LogManager.w( AppInstance?.type.__name, "API_GetProductList()", "Result", JSON.stringify( response.data ) )
      if( response.data.success > 0 ) {
        ProductList.value = response.data.data
      }
      else alert( "서버 요청 오류 - 잠시 후 다시 시도해 주세요" )
    })
    .catch(ex => {
      LogManager.w( AppInstance?.type.__name, "API_GetProductList()", "서버 요청 오류", ex )
      alert( "서버 요청 오류 - 잠시 후 다시 시도해 주세요" )
    })
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
html, body, div {
  font-size: 100%;
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
  font-size: 90%;
}
</style>
