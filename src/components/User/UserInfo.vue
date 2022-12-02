<template>
  <div class="container h-100 d-flex flex-column flex-grow-1 align-items-center">
    <div class="w-100 row justify-content-center">

        <form class="col-8 mt-5" v-on:submit.prevent="API_ModifyUserInfo" autocomplete="off">
          <div class="row">
            <span class="fs-4 text-primary text-center"><b>회원 정보 수정</b></span>
          </div>
          <div class="row mt-1 mx-0">
            <div class="col px-0">
              <div class="row border-top border-bottom mx-0">
                <div class="col-3 bg-light d-flex align-items-center justify-content-center">
                  <span class="fw-bold table_title">계정</span>
                </div>
                <div class="col p-2">{{ UserInfo.Account }}</div>
              </div>

              <div class="row border-bottom mx-0">
                <div class="col-3 bg-light d-flex align-items-center justify-content-center">
                  <span class="fw-bold table_title">사용자명</span>
                </div>
                <div class="col p-2">{{ UserInfo.UserName }}</div>
              </div>

              <div class="row border-bottom mx-0">
                <div class="col-3 bg-light d-flex align-items-center justify-content-center">
                  <span class="fw-bold table_title">회사명</span>
                </div>
                <div class="col p-2">{{ UserInfo.CompanyName }}</div>
              </div>

              <div class="row border-bottom mx-0">
                <div class="col-3 bg-light d-flex align-items-center justify-content-center">
                  <span class="fw-bold table_title">이메일</span>
                </div>
                <div class="col px-0 py-1">
                  <input class="form-control table_input" id="Input_UserInfo_Email" type="email" v-model="UserInfo.Email" v-on:keydown.enter.prevent="" required/>
                </div>
              </div>

              <div class="row border-bottom mx-0">
                <div class="col-3 bg-light d-flex align-items-center justify-content-center">
                  <span class="fw-bold table_title">사무실 전화번호</span>
                </div>
                <div class="col px-0 py-1">
                  <input class="form-control table_input" id="Input_UserInfo_Telephone" type="text" v-model="UserInfo.Telephone" v-on:keydown.enter.prevent=""/>
                </div>
              </div>

              <div class="row border-bottom mx-0">
                <div class="col-3 bg-light d-flex align-items-center justify-content-center">
                  <span class="fw-bold table_title">팩스</span>
                </div>
                <div class="col px-0 py-1">
                  <input class="form-control table_input" id="Input_UserInfo_Fax" type="text" v-model="UserInfo.Fax" v-on:keydown.enter.prevent=""/>
                </div>
              </div>

              <div class="row border-bottom mx-0">
                <div class="col-3 bg-light d-flex align-items-center justify-content-center">
                  <span class="fw-bold table_title">휴대폰번호</span>
                </div>
                <div class="col px-0 py-1">
                  <input class="form-control table_input" id="Input_UserInfo_MobilePhone" type="text" v-model="UserInfo.MobilePhone" v-on:keydown.enter.prevent="" required/>
                </div>
              </div>

              <div class="row border-bottom mx-0">
                <div class="col-3 bg-light d-flex align-items-center justify-content-center">
                  <span class="fw-bold table_title">권한 상태</span>
                </div>
                <div class="col p-2">{{ UserInfo.PermissionState }}</div>
              </div>

              <div class="row border-top mt-3 mx-0">
                <div class="col-3 bg-light d-flex align-items-center justify-content-center">
                  <span class="fw-bold table_title">비밀번호 변경</span>
                </div>
                <div class="col px-0 py-1">
                  <input class="form-control table_input" id="Input_UserInfo_Password_Change" type="password" placeholder="미입력시 변경되지 않습니다." v-model="FormValue.Password_Change" v-on:keydown.enter.prevent=""/>
                </div>
              </div>

              <div class="row border-top border-bottom mx-0">
                <div class="col-3 bg-light d-flex align-items-center justify-content-center">
                  <span class="fw-bold table_title">비밀번호 확인</span>
                </div>
                <div class="col px-0 py-1">
                  <input class="form-control table_input" id="Input_UserInfo_Password_Confirm" type="password" placeholder="확인 비밀번호를 입력해 주세요" v-model="FormValue.Password_Confirm" v-on:keydown.enter.prevent=""/>
                </div>
              </div>

            </div>
          </div>

          <div class="row justify-content-center" style="margin-top: 30px; margin-bottom: 150px">
            <div class="col text-center">
              <button class="btn btn-outline-primary px-5 me-2" type="submit">수정</button>
              <button class="btn btn-outline-secondary px-5 ms-2" type="button" v-on:click="router.go( -1 )">취소</button>
            </div>
          </div>

        </form>
    </div>
  </div>
</template>

<script setup>
  // 외부데이터 전달
  const Emits = defineEmits( [ "Event_UpdateSignIn" ] )
  // 인스턴스 생성
  import { getCurrentInstance, ref, onMounted } from 'vue'
  import sha256 from 'sha256'
  import router from '@/router'
  import LogManager from '@/utility/LogManager'
  // 인스턴스 할당
  const AppInstance = getCurrentInstance()
  const AxiosInstance = AppInstance.appContext.config.globalProperties.$axios
  // 전역변수 할당
  let GLOBAL_PROPERTY = AppInstance.appContext.config.globalProperties
  // 내부변수 할당
  const UserInfo = ref( {} )
  const FormValue = ref( { Password_Change: "", Password_Confirm: "" } )
  // 이벤트 설정
  onMounted(() => {
    LogManager.w( AppInstance?.type.__name, 'onMounted()' )
    DisplayLayout_Default()
  })
  // 내부 함수
  function DisplayLayout_Default() {
    API_GetUserInfo()       // 회원 정보 수집
  }
  // API 요청 - 회원 정보 수집
  function API_GetUserInfo() {
    var PostParams = new URLSearchParams()
    AxiosInstance.post( "/api/Users/GetUserInfo.php", PostParams )
    .then(response => {
      LogManager.w( AppInstance?.type.__name, "API_GetUserInfo()", "Result", JSON.stringify( response.data ) )
      if( response.data.success > 0 ) {
        UserInfo.value = response.data.data[0]
      }
      else if( response.data.success == -1000 ) {
        alert( "인증키 오류가 발생 되었습니다. 로그인 후 사용해 주세요." )
        GLOBAL_PROPERTY.$SignInState = false
        router.push( "/" )
      }
      else alert( "서버 요청 오류 - 잠시 후 다시 시도해 주세요" )
    })
    .catch(ex => {
      LogManager.w( AppInstance?.type.__name, "API_GetUserInfo()", "서버 요청 오류", ex )
      alert( "서버 요청 오류 - 잠시 후 다시 시도해 주세요" )
    })
  }
  // API 요청 - 회원 정보 수정
  function API_ModifyUserInfo() {
    if( FormValue.value.Password_Change.length > 0 || FormValue.value.Password_Confirm.length > 0 ) {
      if( FormValue.value.Password_Change !== FormValue.value.Password_Confirm ) {
        alert( "확인 비밀번호가 일치하지 않습니다" )
        return
      }
    }
    var PostParams = new URLSearchParams()
    PostParams.append( 'EMAIL', UserInfo.value.Email );
    PostParams.append( 'TELEPHONE', UserInfo.value.Telephone );
    PostParams.append( 'FAX', UserInfo.value.Fax );
    PostParams.append( 'MOBILE_PHONE', UserInfo.value.MobilePhone );
    PostParams.append( 'MODIFIED_PASSWORD', FormValue.value.Password_Change.length > 0 ? sha256( FormValue.value.Password_Change ) : "" );
    LogManager.w( AppInstance?.type.__name, "API_ModifyUserInfo()", "Parameter", PostParams.toString() )
    AxiosInstance.post( "/api/Users/ModifyUserInfo.php", PostParams )
    .then(response => {
      LogManager.w( AppInstance?.type.__name, "API_ModifyUserInfo()", "Result", JSON.stringify( response.data ) )
      if( response.data.success > 0 ) {
        if( FormValue.value.Password_Change.length > 0 ) {                      // 비밀번호 수정 결과 처리
          alert( "비밀번호가 변경되었습니다.\n다시 로그인 후 사용해 주세요." )
          GLOBAL_PROPERTY.$SignInState = false
          GLOBAL_PROPERTY.$SignInToken = ''
          GLOBAL_PROPERTY.$UserId = ''
          GLOBAL_PROPERTY.$UserName = ''
          Emits( "Event_UpdateSignIn" )
          router.push( "/" )
        }
        else {                                                                  // 일반 회원정보 변경 처리
          alert( "회원정보가 수정 되었습니다." )
          API_GetUserInfo()
        }
      }
      else if( response.data.success == -1000 ) {
        alert( "인증키 오류가 발생 되었습니다. 로그인 후 사용해 주세요." )
        GLOBAL_PROPERTY.$SignInState = false
        router.push( "/" )
      }
      else alert( "서버 요청 오류 - 잠시 후 다시 시도해 주세요" )
    })
    .catch(ex => {
      LogManager.w( AppInstance?.type.__name, "API_ModifyUserInfo()", "서버 요청 오류", ex )
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
