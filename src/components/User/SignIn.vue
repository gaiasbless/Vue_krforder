<template>
  <div container-fluid class="h-100 d-flex flex-column flex-grow-1 align-items-center justify-content-center">
    <div class="row w-100 h-100 d-flex flex-nowrap">
      <div class="col-8">
        ㅅㄷㄴㅅ
      </div>
    </div>



  </div>
</template>

<script setup>
// 인스턴스 생성
  import { getCurrentInstance, ref, onMounted } from 'vue'
  import sha256 from 'sha256'
  import LogManager from '@/utility/LogManager'
  // 인스턴스 할당
  const AppInstance = getCurrentInstance()
  const AxiosInstance = $app.appContext.config.globalProperties.$axios

  defineProps({
    msg: String
  })

  onMounted(() => {
    LogManager.w( AppInstance?.type.__name, 'onMounted()' )
    LogManager.w( 'SHA Test : Test => ' + sha256('Test'))
  })

  function log() {
    if( process.env.NODE_ENV === 'development' ) console.log('함수 호출 - API_SignIn() ')
    var PostParams = new URLSearchParams();
    // PostParams.append( 'ID', this.FormValue.Account );
    // PostParams.append( 'PASSWORD', sha256( this.FormValue.Password ) );
    AxiosInstance.post( "/api/Users/SignIn.php", PostParams )
    .then(response => {
      if( process.env.NODE_ENV === 'development' ) console.log( 'Http Result - API_SignIn() - Result : ' + JSON.stringify( response.data ) )
      if( response.data.success > 0 ) {
      }
    })
    .catch(ex => {
      if( process.env.NODE_ENV === 'development' ) console.log('HTTP 호출 실패', ex)
    })
  }

  let count = ref(0)
  let array = ref([ 0, 1, 2 ])
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
html, body {
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
</style>
