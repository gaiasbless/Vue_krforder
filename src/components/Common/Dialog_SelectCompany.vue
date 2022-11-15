<template>
  <div class="modal fade" id="DialogHandler" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-md">
      <div class="modal-content p-4">
        <div class="row px-2">
          <div class="col">
            <b class="fs-5">업체 선택</b>
          </div>
          <div class="col text-end">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
        </div>

        <div class="modal-body mt-2 px-0">
          <table class="table table-hover">
            <thead class="table-secondary">
              <tr>
                <th class="col-3 text-center">업체이름</th>
                <th class="col text-center">주소</th>
                <th class="col-3 text-center">담당자명</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="CompanyInfo in CompanyList" v-bind:key="CompanyInfo.ComppanyIndex" v-on:click="Event_Click_SelectCompany( CompanyInfo.CompanyIndex, CompanyInfo.ManagerIndex )">
                <td class="text-center">{{ CompanyInfo.CompanyName }}</td>
                <td>{{ CompanyInfo.CompanyAddress }}</td>
                <td class="text-center">{{ CompanyInfo.ManagerName }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="row mt-3">
          <div class="col text-end">
            <button class="btn btn-outline-secondary" style="width: 80px" type="button" data-bs-dismiss="modal">취소</button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
  // 외부데이터 전달
  const Props = defineProps({
  })
  // 외부데이터 반환
  const Emits = defineEmits( [ "Event_ReturnResult" ] )
  // 인스턴스 생성
  import { getCurrentInstance, ref, onMounted, onUpdated, onBeforeUnmount } from 'vue'
  import LogManager from '@/utility/LogManager'
  import * as bootstrap from 'bootstrap'
  // 인스턴스 할당
  const AppInstance = getCurrentInstance()
  const AxiosInstance = AppInstance.appContext.config.globalProperties.$axios
  // 전역변수 할당
  let GLOBAL_PROPERTY = AppInstance.appContext.config.globalProperties
  // 내부변수 할당
  let DialogInstance = null
  let CompanyList = ref( [] )
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
  // 내부 함수
  function DisplayLayout_Default() {
    DialogInstance = new bootstrap.Modal( "#DialogHandler", { focus: true, keyboard: true })
    // 부트스트랩 모달창 닫기 이벤트 핸틀러
    document.getElementById('DialogHandler').addEventListener('hidden.bs.modal', event => {
      Emits( "Event_ReturnResult", "Result_SelectCompany", 0, 0 )
    })
    DialogInstance.show()
    // API 요청 - 업체 목록 수집
    API_GetCompanyList()
  }
  function Event_Click_SelectCompany( CompanyIndex, ManagerIndex ) {
    DialogInstance.hide()
    Emits( "Event_ReturnResult", "Result_SelectCompany", CompanyIndex, ManagerIndex )
  }
  // API 요청 - 업체 목록 수집
  function API_GetCompanyList() {
    var PostParams = new URLSearchParams();
    AxiosInstance.post( "/api/Service/GetCompanyList.php", PostParams )
    .then(response => {
      LogManager.w( AppInstance?.type.__name, "API_GetCompanyList()", "Result", JSON.stringify( response.data ) )
      if( response.data.success > 0 ) {
        CompanyList.value = response.data.data
      }
      else alert( "서버 요청 오류 - 잠시 후 다시 시도해 주세요" )
    })
    .catch(ex => {
      LogManager.w( AppInstance?.type.__name, "API_GetCompanyList()", "서버 요청 오류", ex )
      alert( "서버 요청 오류 - 잠시 후 다시 시도해 주세요" )
    })
  }
</script>
