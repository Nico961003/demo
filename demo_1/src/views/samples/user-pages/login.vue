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
                  <div class="form-group">
                    <label class="label">Nombre de usuario</label>
                    <div class="input-group">
                      <input type="text" id="username" name="username" v-model="form.username" class="form-control" placeholder="Nombre de usuario">
                      <div class="input-group-append">
                        <span class="input-group-text">
                          <i class="mdi mdi-check-circle-outline"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="label">Contraseña</label>
                    <div class="input-group">
                      <input type="password" id="password" name="password" v-model="form.password" class="form-control" placeholder="*********">
                      <div class="input-group-append">
                        <span class="input-group-text">
                          <i class="mdi mdi-check-circle-outline"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <!-- <button class="btn btn-primary submit-btn btn-block">Entrar</button> -->
                    <button type="submit" class="btn btn-primary submit-btn btn-block">
                        {{ isSaving ? 'Saving...' : 'Enviar'}}
                    </button>
                  </div>
                  <div class="form-group d-flex justify-content-between">
                    <!-- <div class="form-check form-check-flat mt-0">
                      <label class="form-check-label">
                        <input type="checkbox" class="form-check-input" checked> Keep me signed in </label>
                    </div> -->
                    <a href="#" class="text-small forgot-password text-black">Olvide mi contraseña</a>
                  </div>
                  <!-- <div class="form-group">
                    <button class="btn btn-block g-login">
                      <img class="mr-3"  alt="">Log in with Google</button>
                  </div> -->
                  <div class="text-block text-center my-3">
                    <span class="text-small font-weight-semibold">¿No tienes una cuenta?</span>
                    <a href="register.html" class="text-black text-small">Registrarme</a>
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
import userFormSchema from '../../../forms/userFormSchema'
import { HTTP } from '../../../http-common-login'
export default {
  name: 'login',
  data () {
    return {
      form: {
        username: '',
        password: '',
        realm: 'SpringBoot'
      },
      schema: userFormSchema,
      formOptions: {
        validateAfterChanged: true
      },
      isSaving: false
    }
  },
  methods: {
    async submitLogin () {
      try {
        await HTTP.get('newToken', {
          ...this.form
        }).then(r => {
          this.users = r.data
          console.log(this.users)
          this.$router.push('/dashboard')
        })
        alert('Saved Successfully')
      } catch (e) {
        console.log(e)
        alert(e.message)
      }
      window.locaton = 'users/readUsers'
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
  /* font-family: Arial; */
  /* text-transform: uppercase; */
  font-variant: small-caps;
}
</style>
