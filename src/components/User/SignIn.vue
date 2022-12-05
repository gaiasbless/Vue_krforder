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
      <div class="row mt-2">
        <button class="btn btn-outline-primary" type="button" v-on:click="router.replace( '/user/signup' )">회원가입</button>
      </div>
    </form>
    <!-- 다이얼로그 -->
    <Dialog_Alert Title="로그인 실패" Message="계정 또는 비밀번호가 일치하지 않습니다."/>
  </div>
</template>

<script setup>
  import Dialog_Alert from '@/components/Common/Dialog_Common_Alert.vue'

  // 외부데이터 전달
  const Props = defineProps({
    LocalSignIn:{ Type: String, default : "" },
  })
    const Emits = defineEmits( [ "Event_UpdateSignIn" ] )
  // 인스턴스 생성
  import { getCurrentInstance, ref, onMounted } from 'vue'
  import sha256 from 'sha256'
  import router from '@/router'
  import LogManager from '@/utility/LogManager'
  import * as bootstrap from 'bootstrap'
  // 인스턴스 할당
  const AppInstance = getCurrentInstance()
  const AxiosInstance = AppInstance.appContext.config.globalProperties.$axios
  // 전역변수 할당
  let GLOBAL_PROPERTY = AppInstance.appContext.config.globalProperties
  // 내부변수 할당
  const FormValue = ref({ Account: '', Password: '' })
  // 이벤트 설정
  onMounted(() => {
    LogManager.w( AppInstance?.type.__name, 'onMounted()' )
    DisplayLayout_Default()
  })
  // 내부 함수
  function DisplayLayout_Default() {
  }
  function API_SignIn() {
    var PostParams = new URLSearchParams();
    PostParams.append( 'ID', FormValue.value.Account );
    PostParams.append( 'PASSWORD', sha256( FormValue.value.Password ) );
    LogManager.w( AppInstance?.type.__name, "API_SignIn()", "Parameter", PostParams.toString() )
    AxiosInstance.post( "/api/Users/SignIn.php", PostParams )
    .then(response => {
      LogManager.w( AppInstance?.type.__name, "API_SignIn()", "Result", JSON.stringify( response.data ) )
      if( response.data.success > 0 ) {
        GLOBAL_PROPERTY.$SignInState = true
        GLOBAL_PROPERTY.$SignInToken = response.data.SIGNIN_TOKEN
        GLOBAL_PROPERTY.$UserId = response.data.USER_ID
        GLOBAL_PROPERTY.$UserName = response.data.USER_NAME
        // Axios 헤더 데이터 기록 - 리프레쉬 시점에 Axios 기본 데이터도 초기화 됨
        if( typeof AxiosInstance.defaults.headers.common['userindex'] === 'undefined' ) {
          AxiosInstance.defaults.headers.common['userindex'] = response.data.USER_ID
          AxiosInstance.defaults.headers.common['authorization'] = response.data.SIGNIN_TOKEN
        }
        router.replace( "/" )
        Emits( "Event_UpdateSignIn" );
      }
      else {
        FormValue.value.Password = ""
        new bootstrap.Modal( "#Dialog_Alert", { focus: true, keyboard: true }).show()
      }
    })
    .catch(ex => {
      LogManager.w( AppInstance?.type.__name, "API_GetOrderCompanyInfo()", "서버 요청 오류", ex )
    })
  }
</script>

<script>
export default {
  name: 'SignIn',
  data() {
    return {
    }
  },
  created() {
  },
  destroyed() {
  },
  methods: {
  },
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
