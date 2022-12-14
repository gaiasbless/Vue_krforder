<template>
  <div class="h-100 d-flex flex-row" style="overflow-x: hidden;">
    <component style="position: fixed;" v-bind:is="Component_Logistics_Menu" v-bind:key="$route.fullPath" v-on:Event_UpdateMenu="DisplayLayout_UpdateMenu"></component>
    <component style="margin-left: 230px" v-bind:is="Component_Content" v-bind:key="Component_Content" v-on:Event_UpdateMenu="DisplayLayout_UpdateMenu"></component>
  </div>
</template>

<script setup>
  import Component_Logistics_Menu from '@/components/Logistics/Logistics_Menu.vue'
  import Component_Logistics_Store from '@/components/Logistics/Logistics_Store.vue'
  import Component_Logistics_Release from '@/components/Logistics/Logistics_Release.vue'
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
    LogManager.w( "Logistics_Main", "onMounted()" )
    DisplayLayout_Default()
  })
  onUpdated(() => {
    let PageName = useRoute().params.PageName
    LogManager.w( "Logistics_Main", "onUpdated()", PageName )
    DisplayLaout_UpdateContent( PageName )
  })
  // 내부 함수
  function DisplayLayout_Default() {
    let PageName = useRoute().params.PageName
    DisplayLaout_UpdateContent( PageName )
  }
  function DisplayLaout_UpdateContent( UrlPageName ) {
    switch( UrlPageName ) {
      case "store":
        if( Component_Content.value != Component_Logistics_Store ) Component_Content.value = Component_Logistics_Store
        break;
      case "release":
        if( Component_Content.value != Component_Logistics_Release ) Component_Content.value = Component_Logistics_Release
        break;
    }
  }
  function DisplayLayout_UpdateMenu( UrlPageName ) {
    LogManager.w( "Logistics_Main", "DisplayLayout_UpdateMenu", "PageName", UrlPageName )
    router.push( { name: 'Logistics_Main', params: { PageName: UrlPageName }} )
  }
</script>

<script>
export default {
  name: 'Logistics_Main',
  data() {
    return {
    }
  },
  created() {
  },
}
</script>
