<template lang="html">
  <b-navbar id="template-header" class="navbar default-layout col-lg-12 col-12 p-0 fixed-top d-flex flex-row" toggleable="md">
    <div class="text-center navbar-brand-wrapper d-flex align-items-top justify-content-center">
      <router-link class="navbar-brand brand-logo" to="/dashboard">
        <img src="../../assets/images/logo-egas.png" alt="logo" />
      </router-link>
      <router-link class="navbar-brand brand-logo-mini" to="/dashboard">
        <img src="../../assets/images/logo-egas.png" alt="logo" />
      </router-link>
    </div>
    <div class="navbar-menu-wrapper d-flex align-items-center ml-auto ml-lg-0">
      <button class="navbar-toggler navbar-toggler align-self-center" type="button" @click="collapedSidebar()">
        <span class="mdi mdi-menu"></span>
      </button>
      <b-navbar-nav class="navbar-nav-right ml-auto">
        <form class="mr-auto search-form d-none d-md-block" @submit.prevent="fijarCliente">
          <!-- <div class="form-group"> -->
          El cliente acutal es :
          <select id="selectClient" type="text" v-model="form.client">
            <option value="" disabled>Selecciona un cliente</option>
            <option v-for="(clients, index) in client" :key="index">
              {{clients}}
            </option>
          </select>
          <button class="btn btn-warning">Fijar</button>
          <!-- </div> -->
        </form>
        <b-nav-item-dropdown right class="preview-list user-dropdown">
          <template slot="button-content">
            <div class="d-flex align-items-center">
              <img class="img-xs rounded-circle" src="../../assets/images/noavatar.svg" alt="Profile image">
            </div>
          </template>
          <b-dropdown-item>
            <div class="dropdown-header text-center w-100">
              <img class="img-md rounded-circle" src="../../assets/images/noavatar.svg" alt="Profile image">
              <p class="profile-name" v-if="userLogged">{{userLogged}}</p>
              <p class="font-weight-light text-muted mb-0" v-if="tokenDecode">{{tokenDecode.email}}</p>
            </div>
          </b-dropdown-item>
          <!--<b-dropdown-item>Mi perfil<span class="badge badge-pill badge-danger">1</span><i class="dropdown-item-icon ti-dashboard"></i></b-dropdown-item>-->
          <b-dropdown-item href="/myProfile">Mi perfil<i class="dropdown-item-icon ti-help-alt"></i></b-dropdown-item>
          <b-dropdown-item href="/">Cerrar Sesión<i class="dropdown-item-icon ti-power-off"></i></b-dropdown-item>
          <b-dropdown-item href="/aboutUs">Acerca de<i class="dropdown-item-icon ti-help-alt"></i></b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
      <button class="navbar-toggler navbar-toggler-right align-self-center" type="button" @click="collapedMobileSidebar()">
        <span class="mdi mdi-menu"></span>
      </button>
    </div>
  </b-navbar>
</template>

<script lang="js">
// eslint-disable-next-line
import JQuery from 'jquery'
import auth from '../../views/main/user-pages/auth'
import decodedToken from '../../logic/decodeToken'
import { HTTP } from '../../logic/http-common'
import clientService from '../../services/clientService'
let $ = JQuery
export default {
  name: 'app-header',
  data () {
    return {
      client: {},
      form: {
        client: ''
      }
    }
  },
  mounted: function () {
    this.loadPage()
    this.loadClients()
    if (localStorage.clientName) {
      this.clientName = localStorage.clientName
    }
  },
  watch: {
    client (name) {
      localStorage.clientName = name
    }
  },
  computed: {
    userLogged () {
      return auth.getUserLogged()
    },
    tokenDecode () {
      return decodedToken.getTokenDecode()
    }
  },
  methods: {
    collapedSidebar: function () {
      $('body').toggleClass('sidebar-icon-only')
    },
    collapedMobileSidebar: function () {
      $('#sidebar').toggleClass('active')
    },
    loadPage () {
      var checkSession = decodedToken.getTokenDecode()
      if (checkSession == null) {
        this.$router.push('/')
      }
    },
    loadClients () {
      let list = []
      HTTP.get('client/viewClients').then(r => {
        Object.values(r.data).forEach(function (item) {
          if (item.clientId !== 'account' && item.clientId !== 'account-console' && item.clientId !== 'admin-cli' && item.clientId !== 'broker' && item.clientId !== 'realm-management' && item.clientId !== 'security-admin-console') {
            list.push(item.clientId)
          }
        })
        this.client = list
        // console.log(this.client)
      })
    },
    async fijarCliente () {
      this.$swal({ type: 'info', timer: 1000, text: 'Cliente fijado', showCancelButton: false, showConfirmButton: false })
      await clientService.getClientByName(this.form.client).then((response) => {
        this.clientId = response.data.id
        localStorage.clientName = this.clientId
      }).catch((e) => {
        console.log(e)
      })
      this.$router.go(0)
    }
  }
}
</script>

<style scoped lang="scss">
.app-header {
}
</style>
