<template>
  <div class="h-100 d-flex flex-row" style="overflow-x: hidden;">
    <component style="position: fixed;" v-bind:is="Component_Order_Menu" v-bind:key="$route.fullPath" v-on:Event_UpdateMenu="DisplayLayout_UpdateMenu"></component>
    <component style="margin-left: 250px" v-bind:is="Component_Content" v-bind:key="Component_Content" v-on:Event_UpdateMenu="DisplayLayout_UpdateMenu"></component>
  </div>
</template>

<script setup>
  import Component_Order_Menu from '@/components/Order/Order_Menu.vue'
  import Component_Order_ProductList from '@/components/Order/Order_ProductList.vue'
  import Component_Order_RegisterList from '@/components/Order/Order_RegisterList.vue'
  import Component_Order_Release from '@/components/Order/Order_Release.vue'
  import Component_Order_Register from '@/components/Order/Order_Register.vue'
  // 인스턴스 생성
  import { getCurrentInstance, ref, shallowRef, onMounted, onUpdated } from 'vue'
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
  onUpdated(() => {
    let PageName = useRoute().params.PageName
    LogManager.w( "Order_Main", "onUpdated()", PageName )
    DisplayLaout_UpdateContent( PageName )
  })
  // 내부 함수
  function DisplayLayout_Default() {
    DisplayLaout_UpdateContent( "list" )
  }
  function DisplayLaout_UpdateContent( UrlPageName ) {
    switch( UrlPageName ) {
      case "list":
        if( Component_Content.value != Component_Order_ProductList ) Component_Content.value = Component_Order_ProductList
        break;
      case "reglist":
        if( Component_Content.value != Component_Order_RegisterList ) Component_Content.value = Component_Order_RegisterList
        break;
      case "release":
        Component_Content.value = Component_Order_Release
        break;
      case "register":
        if( Component_Content.value != Component_Order_Register ) Component_Content.value = Component_Order_Register
        break;
    }
  }
  function DisplayLayout_UpdateMenu( UrlPageName ) {
    LogManager.w( "Order_Main", "DisplayLayout_UpdateMenu", "PageName", UrlPageName )
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
