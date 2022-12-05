<template>
  <div class="container d-flex flex-column flex-grow-1 align-items-center">
    <form v-on:submit.prevent="API_SIgnUp" style="width: 400px" autocomplete="off">
      <div class="mt-5">
        <h3 class="text-center"><b>회원가입</b></h3>
      </div>
      <div class="mt-2">
        <h6 class="text-secondary fw-bold">계정</h6>
        <input class="form-control" style="margin-top: -5px; ime-mode: disabled" ref="Input_Account" id="Input_Account" type="text" v-model="FormValue.Account" autofocus required/>
      </div>
      <div class="mt-2">
        <h6 class="text-secondary fw-bold">비밀번호</h6>
        <input class="form-control" style="margin-top: -5px" id="Input_Password" type="password" v-model="FormValue.Password" required/>
      </div>
      <div class="mt-2">
        <h6 class="text-secondary fw-bold">비밀번호 확인</h6>
        <input class="form-control" style="margin-top: -5px" id="Input_Password_Confirm" type="password" v-model="FormValue.Password_Confirm" required/>
        <span class="text-danger" style="font-size: 70%">비밀번호는 암호화 되어 저장 됩니다.</span>
      </div>
      <div class="mt-2">
        <h6 class="text-secondary fw-bold">사용자명</h6>
        <input class="form-control" style="margin-top: -5px" id="Input_Name" type="text" v-model="FormValue.UserName" required/>
      </div>
      <div class="mt-2">
        <h6 class="text-secondary fw-bold">이메일</h6>
        <input class="form-control" style="margin-top: -5px" id="Input_Email" type="email" v-model="FormValue.Email" required/>
      </div>
      <div class="mt-2">
        <h6 class="text-secondary fw-bold">사무실 전화번호</h6>
        <input class="form-control" style="margin-top: -5px" id="Input_Telephone" type="text" v-model="FormValue.Telephone" v-on:keypress="InputLimit_OnlyPhoneNumber($event)"/>
      </div>
      <div class="mt-2">
        <h6 class="text-secondary fw-bold">팩스</h6>
        <input class="form-control" style="margin-top: -5px" id="Input_Fax" type="text" v-model="FormValue.Fax" v-on:keypress="InputLimit_OnlyPhoneNumber($event)"/>
      </div>
      <div class="mt-2">
        <h6 class="text-secondary fw-bold">휴대전화번호</h6>
        <input class="form-control" style="margin-top: -5px" id="Input_MobilePhone" type="text" v-model="FormValue.MobilePhone" v-on:keypress="InputLimit_OnlyPhoneNumber($event)" required/>
      </div>
      <div class="row my-4">
        <div class="col text-center">
          <button class="btn btn-outline-primary me-2" style="width: 150px" type="submit">회원가입</button>
          <button class="btn btn-outline-secondary ms-2" style="width: 150px" type="button" v-on:click="router.go( -1 )">취소</button>
        </div>
      </div>
    </form>

  </div>
</template>

<script setup>
  // 인스턴스 생성
  import { getCurrentInstance, ref, onMounted, watch } from 'vue'
  import sha256 from 'sha256'
  import router from '@/router'
  import LogManager from '@/utility/LogManager'
  // 인스턴스 할당
  const AppInstance = getCurrentInstance()
  const AxiosInstance = AppInstance.appContext.config.globalProperties.$axios
  // 레이아웃 연결
  let Input_Account = ref( null )
  // 전역변수 할당
  let GLOBAL_PROPERTY = AppInstance.appContext.config.globalProperties
  // 내부변수 할당
  const FormValue = ref( { Account: "", Password: "", Password_Confirm: "", UserName: "", Email: "", Telephone: "", Fax: "", MobilePhone: "" } )
  // 이벤트 설정
  onMounted(() => {
    LogManager.w( AppInstance?.type.__name, 'onMounted()' )
    DisplayLayout_Default()
  })
  // 감시자
  watch(() => [FormValue.value.Account], ( NewValue, OldValue ) => {
    InputLimit_OnlyAlphabetSpecial()
  })
  // 내부 함수
  function DisplayLayout_Default() {
    // 포커스 설정
    setTimeout( function() { Input_Account.value.focus() }, 300 )
  }
  // 입력제한 - 전화번호
  function InputLimit_OnlyPhoneNumber( Event ) {
    let char = String.fromCharCode( Event.keyCode )
    if( /^[+-]?\d*$/.test( char ) ) return true
    else Event.preventDefault()
  }
  // 입력제한 - 숫자 알파벳만 하용 (watch 삭제 방식)
  function InputLimit_OnlyAlphabetSpecial() {
    const RegExp = /[^0-9a-zA-Z]/g
    if( RegExp.test( FormValue.value.Account ) ) FormValue.value.Account = FormValue.value.Account.replace( RegExp, '' )
    // LogManager.w( AppInstance?.type.__name, 'InputLimit_OnlyAlphabetSpecial()', FormValue.value.Account )
  }
  // API 요청 - 회원 가입
  function API_SIgnUp() {
    LogManager.w( AppInstance?.type.__name, 'API_SIgnUp()' )
    if( FormValue.value.Password.length > 0 || FormValue.value.Password_Confirm.length > 0 ) {
      if( FormValue.value.Password !== FormValue.value.Password_Confirm ) {
        alert( "확인 비밀번호가 일치하지 않습니다" )
        return
      }
    }
    var PostParams = new URLSearchParams()
    PostParams.append( 'ID', FormValue.value.Account );
    PostParams.append( 'PASSWORD', sha256( FormValue.value.Password ) );
    PostParams.append( 'NAME', FormValue.value.UserName );
    PostParams.append( 'EMAIL', FormValue.value.Email );
    PostParams.append( 'TELEPHONE', FormValue.value.Telephone );
    PostParams.append( 'FAX', FormValue.value.Fax );
    PostParams.append( 'MOBILE_PHONE', FormValue.value.MobilePhone );
    LogManager.w( AppInstance?.type.__name, "API_SIgnUp()", "Parameter", PostParams.toString() )
    AxiosInstance.post( "/api/Users/SignUp.php", PostParams )
    .then(response => {
      LogManager.w( AppInstance?.type.__name, "API_SIgnUp()", "Result", JSON.stringify( response.data ) )
      if( response.data.success > 0 ) {
        alert( "회원가입이 완료 되었습니다.\n로그인 후 사용해 주세요." )
        router.push( "/" )
      }
      else if( response.data.success == -1 ) {
        alert( FormValue.value.Account + " 계정은 이미 사용 중 입니다.\n다른 아이디를 사용해 주세요." )
        Input_Account.value.focus()
      }
      else alert( "서버 요청 오류 - 잠시 후 다시 시도해 주세요" )
    })
    .catch(ex => {
      LogManager.w( AppInstance?.type.__name, "API_SIgnUp()", "서버 요청 오류", ex )
      alert( "서버 요청 오류 - 잠시 후 다시 시도해 주세요" )
    })
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
html, body {
  font-size: 90%;
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
.table_title {
  font-size: 95%;
}
.table_input {
  border: none;
  font-size: 95%;
}
input::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: red;
  opacity: 1; /* Firefox */
}

input::-ms-input-placeholder { /* Internet Explorer 10-11 */
  color: red;
}

input::-ms-input-placeholder { /* Microsoft Edge */
  color: red;
}
</style>
