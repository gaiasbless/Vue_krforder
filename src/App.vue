<template>
  <div id="app" v-bind:style="Style_Size">
    <Component_Header_Base class="sticky-top" v-bind:key="Key_UpdateCount" v-on:Event_UpdateSignIn="DisplayLayout_UpdateSignIn"/>
    <router-view v-on:Event_UpdateSignIn="DisplayLayout_UpdateSignIn"/>
  </div>
</template>

<script setup>
  import Component_Header_Base from '@/components/Common/Header_Base.vue'

  // 인스턴스 생성
  import { getCurrentInstance, ref, onMounted } from 'vue'
  import LogManager from '@/utility/LogManager'
  // 인스턴스 할당
  const AppInstance = getCurrentInstance()
  // 전역변수 할당
  // 내부변수 할당
  let Key_UpdateCount = ref( 0 )
  // 이벤트 설정
  onMounted(() => {
    LogManager.w( "App", 'onMounted()' )
    DisplayLayout_Default()
  })
  // 내부 함수
  function DisplayLayout_Default() {
  }
  function DisplayLayout_UpdateSignIn() {
    Key_UpdateCount.value = Key_UpdateCount.value + 1
  }
</script>

<script>
export default {
  name: 'App',
  data() {
    return {
      Style_Size: '',
    }
  },
  created() {
    window.addEventListener( 'resize', this.EventHandler_Resize )
    window.addEventListener( 'scroll', this.EventHandler_Scroll )
    this.EventHandler_Resize()
  },
  destroyed() {
      window.removeEventListener( 'resize', this.EventHandler_Resize )
      window.removeEventListener( 'scroll', this.EventHandler_Scroll )
  },
  methods: {
    EventHandler_Resize() {
      this.Style_Size = 'height: ' + (window.innerHeight) + 'px;'
    },
    EventHandler_Scroll() {
      this.Style_Size = 'height: ' + (window.innerHeight) + 'px;'
    }
  },
}
</script>

<style lang="scss">
  @import url(//fonts.googleapis.com/earlyaccess/jejugothic.css);
  @import url(//fonts.googleapis.com/earlyaccess/notosanskr.css);
  @import url(//fonts.googleapis.com/earlyaccess/nanumgothic.css);
  #app {
    font-family: 'Nanum Gothic', 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    display: flex;
    flex-direction: column;
    font-size: medium;
    text-align: left;
    color: black;
  }
</style>
