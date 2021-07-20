<template lang='html'>
  <section class='dashboard'>
    <!-- Page Title Header Starts-->
    <div class='row page-title-header'>
      <div class='col-12'>
        <div class='page-header'>
          <h4 class='page-title'>Editar usuario</h4>
        </div>
      </div>
    </div>
    <!-- Page Title Header Ends-->
    <div class="container">
        <div class="card pl-4 pt-5 pb-5 pr-4 mt-3">
            <form >
            <div class="form-row">
              <div class="col-md-6 mb-3">
                <label for="firstName">Nombre(s)</label>
                <!-- <div v-if="isEdit"> -->
                  <input type="text" class="form-control" id="firstName" name="firstName" v-model="form.firstName" placeholder="Nombre(s)" value="" required>
                <!-- </div> -->
                <div class="valid-tooltip">
                  Es aceptable!
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <label for="lastName">Apellido(s)</label>
                <input type="text" class="form-control" id="lastName" name="lastName" v-model="form.lastName" placeholder="Apellido(s)" value="" required>
                <div class="valid-tooltip">
                  Es aceptable!
                </div>
              </div>
            </div>
            <div class="form-row">
              <div class="col-md-6 mb-3">
                <label for="username">Nombre de usuario</label>
                <div class="input-group">
                  <input type="text" class="form-control" id="username" name="username" v-model="form.username" placeholder="Nombre de usuario"  required>
                  <!-- <div class="invalid-tooltip">
                    Ingresa un usuario
                  </div> -->
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <label for="password">Contraseña</label>
                <div class="input-group">
                  <input type="password" class="form-control" id="password" name="password" v-model="form.password" placeholder="Contraseña" required>
                  <!-- <div class="invalid-tooltip">
                    Ingresa una contraseña valida
                  </div> -->
                </div>
              </div>
            </div>
            <div class="form-row">
              <div class="col-md-6 mb-3">
                <label for="email">Correo electronico</label>
                <input type="email" class="form-control" id="email" name="email" v-model="form.email" placeholder="Correo electronico" required>
                <div class="invalid-tooltip">
                  Por favor ingresa una dirección de correo electronico valida
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div>
                  <Multiselect
                    v-model="value"
                    :options="options"
                  />
                </div>
              </div>
            </div>
            <div class="form-row">
              <div class="col-md-6 mb-3">
                <div class="custom-control custom-switch">
                  <input type="checkbox" class="custom-control-input" id="enable" name="enable" v-model="form.enable">
                  <label class="custom-control-label" for="enable">¿Habilitar usuario?</label>
                </div>
              </div>
            </div>
                <div class="d-flex justify-content-end mt-3 pr-4">
                    <button type="submit" class="btn btn-primary btn-lg">
                        {{ isSaving ? 'Saving...' : 'Enviar'}}
                    </button>
                </div>
            </form>
        </div>
    </div>
  </section>
</template>

<script lang='js'>
import userFormSchema from '../../forms/userFormSchema'
import { HTTP } from '../../http-common'
import $ from 'jquery'
import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'
Vue.use(VueCompositionAPI)
import Multiselect from '@vueform/multiselect/dist/multiselect.vue2.js'

export default {
  name: 'edit-User',
  components: {
    Multiselect
  },
  mounted () {
    var userId = this.$route.params.id
    this.ver(userId)
  },
  data () {
    return {
      form: {
        firstName: '',
        lastName: '',
        email: '',
        realm: 'SpringBoot',
        role: 'user',
        enable: false,
        username: '',
        password: '',
        isEdit: true,
        value: null,
        options: [
          'Batman',
          'Robin',
          'Joker'
        ]
      },
      schema: userFormSchema,
      formOptions: {
        validateAfterChanged: true
      },
      isSaving: false
    }
  },
  methods: {
    async submitUserDetails () {
      try {
        await HTTP.post('user/createUser', {
          ...this.form
        })
        alert('Saved Successfully')
        console.log(this.form)
      } catch (e) {
        console.log(e)
        alert(e.message)
      }
    },
    async ver (userId) {
      HTTP.get('user/viewUser/' + userId).then(r => {
        this.user = r.data
        console.log(this.user)
        $('#firstName').val(this.user.firstName)
        $('#lastName').val(this.user.lastName)
        $('#email').val(this.user.email)
        $('#username').val(this.user.username)
      })
    }
  }
}
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
