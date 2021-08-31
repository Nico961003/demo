<template lang="html">
  <section class="login">
    <div class="container-scroller">
      <div class="container-fluid page-body-wrapper full-page-wrapper">
        <div class="content-wrapper d-flex align-items-center auth auth-bg-1 theme-one">
          <div class="row w-100">
            <div class="col-lg-4 mx-auto">
              <div class="container-fluid"><center><h1>Keycloak Management</h1></center></div>
              <div class="auto-form-wrapper">
                <form  action="" @submit.prevent="submitLogin">
                  <center>
                    <div v-if="form.error" class="alert alert-warning" role="alert">
                      Usuario y/o contraseña incorrectos
                    </div>
                  </center>
                  <div class="form-group">
                    <label class="label">Nombre de usuario</label>
                    <div>
                      <input type="text" id="username" name="username" v-model="form.username" class="form-control" placeholder="Nombre de usuario">
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="label">Contraseña</label>
                    <div>
                      <input type="password" id="password" name="password" v-model="form.password" class="form-control" placeholder="*********">
                    </div>
                  </div>
                  <div class="form-group">
                    <button type="submit" class="btn btn-primary submit-btn btn-block">
                        {{ isSaving ? 'Saving...' : 'Enviar'}}
                    </button>
                  </div>
                  <div class="form-group d-flex justify-content-between">
                    <a href="#" class="text-small forgot-password">Olvide mi contraseña</a>
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
import { HTTP } from '../../../logic/http-common-login'
import auth from './auth'
export default {
  name: 'login',
  data () {
    return {
      form: {
        username: '',
        password: '',
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
    this.realm = process.env.REALM_ENV
    this.loadPage()
  },
  methods: {
    async submitLogin () {
      try {
        await HTTP.post('newToken', {
          ...this.form
        }).then(r => {
          this.users = r.data
          auth.setUserLogged(this.form.username)
          auth.setUserToken(this.users)
          if (this.users === '') {
            this.form.error = true
          } else {
            this.$router.push('/dashboard')
          }
        })
      } catch (e) {
        console.log(e)
        alert(e.message)
      }
      window.locaton = 'users/readUsers'
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
