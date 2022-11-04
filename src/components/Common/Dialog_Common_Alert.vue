<template>
  <div class="modal fade" id="Dialog_Alert" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-md">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="d-inline-block align-text-bottom text-danger" viewBox="0 0 16 16">
              <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z"/>
              <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z"/>
            </svg>
            <b class="ms-2">{{ Title }}</b>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>{{ Message }}</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary" id="Dialog_Button_Confirm" ref="Dialog_Button_Confirm" type="button" data-bs-dismiss="modal">확인</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  // 외부데이터 전달
  const Props = defineProps({
  	Title:{ Type: String, default : "" },
    Message:{ Type: String, default : "" },
  })
  // 인스턴스 생성
  import { getCurrentInstance, ref, onMounted } from 'vue'
  import LogManager from '@/utility/LogManager'
  // 인스턴스 할당
  const AppInstance = getCurrentInstance()
  // 전역변수 할당
  // 내부변수 할당
  // 기본 레이아웃 출력
  DisplayLayout_Default()
  // 이벤트 설정
  onMounted(() => {
    LogManager.w( AppInstance?.type.__name, 'onMounted()', 'Props', JSON.stringify( Props ) )
  })
  // 내부 함수
  function DisplayLayout_Default() {
  }
</script>
