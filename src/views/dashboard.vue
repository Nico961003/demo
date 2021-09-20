<template lang='html'>
  <section class='dashboard'>
    <!-- Page Title Header Starts-->
    <div class="proBanner">
    </div>
    <div class='row'>
    </div>
    <div class='row'>
      <div class='col-md-4 grid-margin stretch-card'>
        <div class="card" style="width:400px">
          <a href="/readUsers"><img class="card-img-top" src="../assets/images/user-3331258.svg" alt="Card image"></a>
          <div class="card-body">
            <h4 class="card-title">Lista de usuarios</h4>
            <p class="card-text">Conoce los usuarios registrados, crea, modifica, elimina.</p>
            <a href="/readUsers" class="btn btn-primary">Ir</a>
          </div>
        </div>
      </div>
      <div class='col-md-4 grid-margin stretch-card'>
        <div class="card" style="width:400px">
          <a href="/readRoles"><img class="card-img-top" src="../assets/images/authorization.svg" alt="Card image"></a>
          <div class="card-body">
            <h4 class="card-title">Lista de roles</h4>
            <p class="card-text">Conoce los roles registrados, crea, modifica, elimina.</p>
            <a href="/readRoles" class="btn btn-primary">Ir</a>
          </div>
        </div>
      </div>
      <div class='col-md-4 grid-margin stretch-card'>
        <div class="card" style="width:400px">
          <a href="/readClient"><img class="card-img-top" src="../assets/images/clients.svg" alt="Card image"></a>
          <div class="card-body">
            <h4 class="card-title">Lista de clientes</h4>
            <p class="card-text">Conoce los clientes registrados, crea, modifica, elimina.</p>
            <a href="/readClient" class="btn btn-primary">Ir</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang='js'>
import JQuery from 'jquery'
import auth from './main/user-pages/auth'
let $ = JQuery
export default {
  name: 'dashboard',
  components: {
  },
  computed: {
    userToken () {
      return auth.getUserToken()
    }
  },
  methods: {
    toggleProBanner: function () {
      $('body').toggleClass('pro-banner-collapse')
    }
  }
}
</script>

<style scoped lang='scss'>
</style>
