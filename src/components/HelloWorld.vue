<script setup>
  import { getCurrentInstance, ref, onMounted } from 'vue'
  import sha256 from 'sha256'

  const $app = getCurrentInstance()
  const $axios = $app.appContext.config.globalProperties.$axios

  defineProps({
    msg: String
  })

  onMounted(() => {
    console.log( '[' + getCurrentInstance()?.type.__name + '] - onMounted()')
    console.log( 'SHA Test : Test => ' + sha256('Test'))
  })

  function log() {
    if( process.env.NODE_ENV === 'development' ) console.log('함수 호출 - API_SignIn() ')
    var PostParams = new URLSearchParams();
    // PostParams.append( 'ID', this.FormValue.Account );
    // PostParams.append( 'PASSWORD', sha256( this.FormValue.Password ) );
    $axios.post( "/api/Users/SignIn.php", PostParams )
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

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>

  <router-link to="/rt">RouterTest</router-link><br />
  <router-link to="/user/signin">로그인</router-link><br /><br />

  <img src="@bootstrap-icons/icons/spotify.svg" alt="Bootstrap" width="64" height="64">
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
