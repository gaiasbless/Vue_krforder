<template>
  <div class="h-100 d-flex flex-row" style="overflow-x: hidden;">
    <component v-bind:is="Component_Order_Menu" v-bind:key="$route.fullPath" v-on:Event_UpdateMenu="DisplayLayout_UpdateMenu"></component>
    <component v-bind:is="Component_Content" v-bind:key="$route.fullPath"></component>
  </div>
</template>

<script setup>
  import Component_Order_Menu from '@/components/Order/Order_Menu.vue'
  import Component_Order_List from '@/components/Order/Order_List.vue'
  import Component_Order_Release from '@/components/Order/Order_Release.vue'
  import Component_Order_Register from '@/components/Order/Order_Register.vue'

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
  let Component_Content = shallowRef( null )
  // 이벤트 설정
  onMounted(() => {
    LogManager.w( "Order_Main", "onMounted()" )
    DisplayLayout_Default()
  })
  // 내부 함수
  function DisplayLayout_Default() {
    DisplayLaout_UpdateContent( "list" )
  }
  function DisplayLaout_UpdateContent( UrlPageName ) {
    switch( UrlPageName ) {
      case "list":
        Component_Content.value = Component_Order_List
        break;
      case "release":
        Component_Content.value = Component_Order_Release
        break;
      case "register":
        Component_Content.value = Component_Order_Register
        break;
    }
  }
  function DisplayLayout_UpdateMenu( UrlPageName ) {
    LogManager.w( "Order_Main", "DisplayLayout_UpdateMenu", "PageName", UrlPageName )
    DisplayLaout_UpdateContent( UrlPageName )
    router.push( { name: 'Order_Main', params: { PageName: UrlPageName }} )
  }
</script>

<script>
export default {
  name: 'Order_Main',
  data() {
    return {
    }
  },
  created() {
  },
}
</script>
