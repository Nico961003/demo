<template lang='html'>
  <section class='dashboard'>
    <!-- Page Title Header Starts-->
    <div class='row page-title-header'>
      <div class='col-12'>
        <div class='page-header'>
          <h4 class='page-title'>Agregar usuario</h4>
        </div>
      </div>
    </div>
    <!-- Page Title Header Ends-->
    <div class="container">
        <div class="card pl-4 pt-5 pb-5 pr-4 mt-3">
            <form action="" @submit.prevent="submitUserDetails" class="was-validated">
            <div class="form-row">
              <div class="col-md-6 mb-3">
                <label for="firstName">Nombre(s)</label>
                <input type="text" class="form-control" id="firstName" name="firstName" v-model="form.firstName" placeholder="Nombre(s)" value="" required>
                <div class="valid-feedback">
                  Es aceptable!
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <label for="lastName">Apellido(s)</label>
                <input type="text" class="form-control" id="lastName" name="lastName" v-model="form.lastName" placeholder="Apellido(s)" value="" required>
                <div class="valid-feedback">
                  Es aceptable!
                </div>
              </div>
            </div>
            <div class="form-row">
              <div class="col-md-6 mb-3">
                <label for="username">Nombre de usuario</label>
                <div class="input-group">
                  <input type="text" class="form-control" id="username" name="username" v-model="form.username" placeholder="Nombre de usuario"  required @change="checkUsername()">
                <div class="invalid-feedback">
                  El nombre de usuario no podra modificarse
                </div>
                <div class="valid-feedback">
                  Es aceptable!
                </div>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <label for="password">Contraseña</label>
                <div class="input-group">
                  <input :class='{valid:passwordValidation.valid}' type="password" class="form-control" id="password" name="password" v-model="form.password" placeholder="Contraseña" required>
                  <div class="valid-feedback">
                    <p class="text-danger" v-for="(error, index) in passwordValidation.errors" :key="index">{{error}}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-row">
              <div class="col-md-6 mb-3">
                <label for="email">Correo electronico</label>
                <input type="email" class="form-control" id="email" name="email" v-model="form.email" value="@ejemplo.com" placeholder="Correo electronico" required @change="checkEmail()">
                <div class="invalid-feedback">
                  El email no podra modificarse
                </div>
                <div class="valid-feedback">
                  Es aceptable!
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <label class="typo__label">Selecciona rol(es)</label>
                <multiselect v-model="form.rolesClient" :options="options" :multiple="true" :close-on-select="false"
                  :clear-on-select="false" :preserve-search="true" placeholder="Escribe algo" label="nameRole" track-by="nameRole" :preselect-first="true"
                    selectLabel="Click para seleccionar" selectedLabel="Añadida" deselectLabel="Click para descartar">
                  <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} opcion(es) seleccionada(s)</span></template>
                </multiselect>
              </div>
            </div>
            <div class="form-row">
              <div class="col-md-6 mb-3">
                <div class="custom-control custom-switch">
                  <input type="checkbox" class="custom-control-input" id="enabled" name="enabled" v-model="form.enabled">
                  <label class="custom-control-label" for="enabled">¿Habilitar usuario?</label>
                </div>
              </div>
            </div>
                <div class="d-flex justify-content-end mt-3 pr-4">
                    <button type="submit" class="btn btn-primary btn-lg" v-if="passwordValidation.valid">
                        {{ isSaving ? 'Saving...' : 'Enviar'}}
                    </button>
                </div>
            </form>
        </div>
    </div>
  </section>
</template>

<script lang='js'>
import Vue from 'vue'
import Multiselect from 'vue-multiselect'
import userService from '../../services/userService'
import clientService from '../../services/clientService'
Vue.component('multiselect', Multiselect)

export default {
  name: 'add-User',
  components: {
    Multiselect
  },
  mounted () {
    this.realm = process.env.REALM_ENV
    this.loadRoles()
  },
  data () {
    return {
      rules: [
        { message: 'Letra minuscula requerida.', regex: /[a-z]+/ },
        { message: 'Letra mayuscula requerida.', regex: /[A-Z]+/ },
        { message: 'Minimo 8 caracteres.', regex: /.{8,}/ },
        { message: 'Un número es requerido.', regex: /[0-9]+/ }
      ],
      form: {
        firstName: '',
        lastName: '',
        email: '',
        realm: process.env.REALM_ENV,
        enabled: false,
        username: '',
        idClient: localStorage.getItem('clientId'),
        password: '',
        attributes: [localStorage.getItem('clientId')],
        rolesClient: []
      },
      formOptions: {
        validateAfterChanged: true
      },
      isSaving: false,
      options: [],
      tag: [
        { name: 'user', code: 'user' }
      ]
    }
  },
  methods: {
    async submitUserDetails () {
      console.log(this.form)
      await userService.createUser(this.form).then((response) => {
        this.$swal({ type: 'info', timer: 3000, text: 'Se guardo exitosamente', showCancelButton: false, showConfirmButton: false })
        this.$router.push('/readUsers')
      })
        .catch((e) => {
          console.log(e)
        })
    },
    addTag (newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
      }
      this.options.push(tag)
      this.form.rolesClient.push(tag)
    },
    async loadRoles () {
      var datos = []
      // alert(localStorage.getItem('clientName'))
      if (localStorage.getItem('clientName')) {
        var id = localStorage.getItem('clientName')
        try {
          clientService.getClientById(id).then(({ data }) =>
            data.forEach((element) => {
              data.push({
                idClient: id,
                idRole: element.id,
                nameRole: element.name
              })
              datos.push({
                idClient: id,
                idRole: element.id,
                nameRole: element.name
              })
            })
          )
          this.options = datos
        } catch (e) {
          console.log(e)
        }
      } else {
      }
    },
    checkUsername () {
      userService.getUserByUsername(this.form.username).then((response) => {
        if (response.data.username) {
          this.form.username = ''
          this.$swal({ type: 'warning', timer: 3000, title: '¡Aviso!', text: 'El nombre de usuario ya existe', showCancelButton: false, showConfirmButton: false })
        }
      })
        .catch((e) => {
          console.log(e)
        })
    },
    checkEmail () {
      userService.getUserByEmail(this.form.email).then((response) => {
        console.log(response.data)
        if (response.data.email) {
          this.form.email = ''
          this.$swal({ type: 'warning', timer: 3000, title: '¡Aviso!', text: 'El email ya se encuentra registrado', showCancelButton: false, showConfirmButton: false })
        }
      })
        .catch((e) => {
          console.log(e)
        })
    }
  },
  computed: {
    passwordValidation () {
      let errors = []
      for (let condition of this.rules) {
        if (!condition.regex.test(this.form.password)) {
          errors.push(condition.message)
        }
      }
      if (errors.length === 0) {
        return { valid: true, errors }
      } else {
        return { valid: false, errors }
      }
    }
  }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
</style>
