<template>
  <div class="h-100 d-flex flex-column flex-grow-1 p-1" style="width: 250px; min-width: 250px; background: #eae9e9">
    <div class="list-group">
      <span v-bind:class="MenuState.Selected_Order ? MenuState_Selected : MenuState_Unselected" v-on:click="Event_Click_MenuItem( 'list' )">발주 목록</span>
      <span v-bind:class="MenuState.Selected_Release ? MenuState_Selected : MenuState_Unselected" v-on:click="Event_Click_MenuItem( 'release' )">출고 완료 목록</span>
      <span class="list-group-item list-group-item-action mt-1 menu_item">생산 목록</span>
    </div>
  </div>
</template>

<script setup>
  // 외부데이터 전달
  const Emits = defineEmits( [ "Event_UpdateMenu" ] )
  // 인스턴스 생성
  import { getCurrentInstance, ref, shallowRef, onMounted } from 'vue'
  import LogManager from '@/utility/LogManager'
  import router from '@/router'
  import { useRoute } from 'vue-router'
  // 인스턴스 할당
  const AppInstance = getCurrentInstance()
  // 전역변수 할당
  let GLOBAL_PROPERTY = AppInstance.appContext.config.globalProperties
  // 내부변수 할당
  let MenuState_Selected = "list-group-item list-group-item-action list-group-item-primary fw-bold menu_item"
  let MenuState_Unselected = "list-group-item list-group-item-action menu_item"
  let MenuState = ref( {
      Selected_Order: false,
      Selected_Release: false,
  } )
  // 이벤트 설정
  onMounted(() => {
    // LogManager.SetDisplay( false )
    LogManager.w( "Order_Menu", 'onMounted()' )
    DisplayLayout_Default()
  })
  // 내부 함수
  function DisplayLayout_Default() {
    DisplayLayout_MenuState()
  }
  function DisplayLayout_MenuState() {
    let PageName = useRoute().params.PageName
    // LogManager.w( "Order_Menu", "DisplayLayout_MenuState", "PageName", PageName )
    MenuState.value.Selected_Order = false
    MenuState.value.Selected_Release = false
    switch( PageName ) {
      case "list":
        MenuState.value.Selected_Order = true
        break;
      case "release":
        MenuState.value.Selected_Release = true
        break;
    }
  }
  function Event_Click_MenuItem( PageName ) {
    Emits( "Event_UpdateMenu", PageName )
  }
</script>

<script>
export default {
  name: 'Header_Base',
  data() {
    return {
    }
  },
  created() {
  },
}
</script>

<style scoped>
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
.menu_item {
  font-size: 90%;
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>
