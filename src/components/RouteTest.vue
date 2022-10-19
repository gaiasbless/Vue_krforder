<script setup>
  import { getCurrentInstance, ref, onMounted } from 'vue'

  const $app = getCurrentInstance()
  const $axios = $app.appContext.config.globalProperties.$axios

  defineProps({
    msg: String
  })

  onMounted(() => {
    console.log( 'LifeCycle - onMounted()' )

    log( process.env.NODE_ENV )
  })

  function log( msg ) {
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
  <h1>Route Test</h1>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
