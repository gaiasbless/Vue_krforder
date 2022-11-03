<template>
  <div class="container h-100 d-flex flex-column flex-grow-1 align-items-center justify-content-center">
    <form class="mb-5" v-on:submit.prevent="API_SignIn" autocomplete="off">
      <div class="row">
        <span class="fs-4 text-primary"><b>K-RF Online Management</b></span>
      </div>
      <div class="row mt-3">
        <input class="form-control" id="Input_Account" type="text" placeholder="계정" v-model="FormValue.Account" autofocus required/>
      </div>
      <div class="row mt-2">
        <input class="form-control" id="Input_Password" type="password" placeholder="비밀번호" v-model="FormValue.Password" required/>
      </div>
      <div class="row mt-2">
        <button class="btn btn-outline-primary" type="submit">로그인</button>
      </div>
    </form>
    <!-- 다이얼로그 -->
    <!--
    <modal ref="Modal_LoginResult_Failed" size="md" centered title="로그인 실패" ok-title="확인" ok-only>
      계정 또는 비밀번호가 일치하지 않습니다.<br>확인 후 재시도 하세요.
    </modal>
   -->
  </div>
</template>

<script setup>
  // 인스턴스 생성
  import { getCurrentInstance, ref, onMounted } from 'vue'
  import sha256 from 'sha256'
  import LogManager from '@/utility/LogManager'
  // 인스턴스 할당
  const AppInstance = getCurrentInstance()
  const AxiosInstance = AppInstance.appContext.config.globalProperties.$axios
  // 내부변수 할당
  const FormValue = ref({ Account: '', Password: '' })
  // 이벤트 설정
  onMounted(() => {
    LogManager.w( AppInstance?.type.__name, 'onMounted()' )
    LogManager.w( 'SHA Test : Test => ' + sha256('Test'))
  })
  // 함수 설정
  function API_SignIn() {
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
