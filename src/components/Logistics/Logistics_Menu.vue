<template>
  <div class="h-100 d-flex flex-column flex-grow-1 p-1" style="width: 230px; min-width: 230px; background: #eae9e9;">
    <div class="list-group">
      <span v-bind:class="MenuState.Selected_Store ? MenuState_Selected : MenuState_Unselected" v-on:click="Event_Click_MenuItem( 'store' )">입고 대기 목록</span>
      <span v-bind:class="MenuState.Selected_Release ? MenuState_Selected : MenuState_Unselected" v-on:click="Event_Click_MenuItem( 'release' )">출고 대기 목록</span>
      <!-- <span v-bind:class="MenuState.Selected_Register ? MenuState_Selected_Margin : MenuState_Unselected_Margin" v-on:click="Event_Click_MenuItem( 'register' )">발주 등록</span> -->
    </div>
  </div>
</template>

<script setup>
  // 외부데이터 반환
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
  let MenuState_Selected_Margin = "list-group-item list-group-item-action list-group-item-primary fw-bold menu_item mt-2"
  let MenuState_Unselected = "list-group-item list-group-item-action menu_item"
  let MenuState_Unselected_Margin = "list-group-item list-group-item-action menu_item mt-2"
  let MenuState = ref( {
      Selected_Store: false,
      Selected_Release: false,
  } )
  // 이벤트 설정
  onMounted(() => {
    // LogManager.SetDisplay( false )
    LogManager.w( "Logistics_Menu", 'onMounted()' )
    DisplayLayout_Default()
  })
  // 내부 함수
  function DisplayLayout_Default() {
    DisplayLayout_MenuState()
  }
  function DisplayLayout_MenuState() {
    let PageName = useRoute().params.PageName
    // LogManager.w( "Logistics_Menu", "DisplayLayout_MenuState", "PageName", PageName )
    MenuState.value.Selected_Store = false
    MenuState.value.Selected_Release = false
    switch( PageName ) {
      case "store":
        MenuState.value.Selected_Store = true
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
  name: 'Order_Menu',
  data() {
    return {
    }
  },
  created() {
  },
}
</script>

<style scoped>
body {
  position: fixed;
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
.menu_item {
  font-size: 90%;
  padding-top: 10px;
  padding-bottom: 10px;
  cursor: pointer;
}
</style>
