<template>
  <div id="app" v-bind:style="Style_Size">
    <component v-bind:is="Component_Header_Base"></component>
    <router-view/>
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
  // 기본 레이아웃 출력
  DisplayLayout_Default()
  // 이벤트 설정
  onMounted(() => {
    LogManager.w( 'App_Main', 'onMounted()' )
  })
  // 내부 함수
  function DisplayLayout_Default() {
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
      this.Style_Size = 'height: ' + (window.innerHeight-57) + 'px;'
    },
    EventHandler_Scroll() {
      this.Style_Size = 'height: ' + (window.innerHeight-57) + 'px;'
    }
  }
}
</script>

<style lang="scss">
  @import '@/assets/scss/custom.scss';
  @import url(//fonts.googleapis.com/earlyaccess/jejugothic.css);
  @import url(//fonts.googleapis.com/earlyaccess/notosanskr.css);
  @import url(//fonts.googleapis.com/earlyaccess/nanumgothic.css);
  #app {
    font-family: 'Nanum Gothic', 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: #2c3e50;
    margin-top: 0px;
  }
</style>
