<template lang="html">
  <section class="login">
    <div class="container-scroller">
      <div class="container-fluid page-body-wrapper full-page-wrapper">
        <div class="content-wrapper d-flex align-items-center auth auth-bg-1 theme-one">
          <div class="row w-100">
            <div class="col-lg-4 mx-auto">
              <div class="container-fluid"><center><h1>Keycloak Management</h1></center></div>
              <div class="auto-form-wrapper">
                <form  action="" @submit.prevent="sendEmail">
                  <center>
                    <div v-if="form.error" class="alert alert-warning" role="alert">
                      {{this.error}}
                    </div>
                  </center>
                  <div class="form-group">
                    <label class="label">Correo electronico</label>
                    <div>
                      <input class="form-control" type="email" placeholder="Correo electronico" v-model="form.email">
                    </div>
                  </div>
                  <div class="form-group">
                    <button type="submit" class="btn btn-primary submit-btn btn-block">
                        {{ isSaving ? 'Saving...' : 'Enviar'}}
                    </button>
                  </div>
                  <div class="form-group d-flex justify-content-between">
                    <a href="/" class="text-small forgot-password">Regresar al Login</a>
                  </div>
                </form>
              </div>
              <ul class="auth-footer">
                <li>
                  <a href="#">Condiciones</a>
                </li>
                <li>
                  <a href="#">Ayuda</a>
                </li>
                <li>
                  <a href="#">Terminos</a>
                </li>
              </ul>
              <p class="footer-text text-center">Derechos de Autor © <a id="fecha"></a> eGas</p>
            </div>
          </div>
        </div>
        <!-- content-wrapper ends -->
      </div>
      <!-- page-body-wrapper ends -->
    </div>
  </section>

</template>

<script lang="js">
import auth from './auth'
import { HTTP } from '../../../logic/http-common-login'
export default {
  name: 'login',
  data () {
    return {
      form: {
        email: '',
        realm: process.env.REALM_ENV,
        error: false
      },
      formOptions: {
        validateAfterChanged: true
      },
      isSaving: false
    }
  },
  mounted: function () {
    localStorage.clientName = ''
    localStorage.clientId = ''
    localStorage.clientName = ''
    this.realm = process.env.REALM_ENV
    this.loadPage()
  },
  methods: {
    async sendEmail () {
      /* Making API call to authenticate a user */
      HTTP
        .get('/user/sendRestoreEmail/' + this.form.email)
        .then(response => {
          console.log(response)
          console.log(response.data)
          // this.toggleLoading()
          var data = response.data
          /* Setting user in the state and caching record to the localStorage */
          if (data) {
            if (data === 'inactivo') {
              this.error = 'El usuario asociado al email no se encuentra activo, consulta a tu administrador'
            } else {
              this.$swal({title: 'Envio exitoso', text: 'Revisa tu bandeja de entrada', icon: 'success', timer: 4000, showCancelButton: false, showConfirmButton: false})
              this.$router.push(data.redirect ? data.redirect : '/login')
            }
          } else {
            this.error = 'El email no se encuentra asociado a algun usuario'
          }
        })
        .catch(error => {
          this.$store.commit('TOGGLE_LOADING')
          console.log(error)
          // this.toggleLoading()
        })
    },
    loadPage () {
      auth.setUserLogged('')
      auth.setUserToken('')
    }
  }
}
</script>

<style scoped lang="scss">
.login {

}
</style>

<style>
h1 {
  color: #ffffff;
  font-weight: normal;
  font-size: 70px;
  font-variant: small-caps;
}
</style>
