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
                  <input type="text" class="form-control" id="username" name="username" v-model="form.username" placeholder="Nombre de usuario"  required>
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
                <input type="email" class="form-control" id="email" name="email" v-model="form.email" value="@ejemplo.com" placeholder="Correo electronico" required>
                <div class="invalid-feedback">
                  El email no podra modificarse
                </div>
                <div class="valid-feedback">
                  Es aceptable!
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <label class="typo__label">Selecciona rol(es)</label>
                <multiselect v-model="form.rolesClient" :options="options" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Escribe algo" label="name" track-by="name" :preselect-first="true">
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
import { HTTP } from '../../logic/http-common'
import Vue from 'vue'
import Multiselect from 'vue-multiselect'
import clientService from '../../services/clientService'
import userService from '../../services/userService'
import roleService from '../../services/roleService'
Vue.component('multiselect', Multiselect)

export default {
  name: 'edit-User',
  components: { Multiselect },
  mounted () {
    this.loadRoles()
    var userId = this.$route.params.id
    this.ver(userId)
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
        realm: 'SpringBoot',
        enabled: false,
        username: '',
        group: 'user',
        password: '',
        idClient: '5bb80642-35cf-47c2-a1eb-3009e411db3c',
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
      try {
        await HTTP.put('user/updateUser/' + this.$route.params.id + '', {
          ...this.form
        })
        this.$swal({ type: 'info', timer: 3000, text: 'Se actualizo exitosamente', showCancelButton: false, showConfirmButton: false })
        this.$router.push('/readUsers')
      } catch (e) {
        console.log(e)
      }
    },
    async ver (userId) {
      var datos = []
      await userService.getUserById(userId).then((r) => {
        this.form.firstName = r.data.firstName
        this.form.lastName = r.data.lastName
        this.form.email = r.data.email
        this.form.realm = 'SpringBoot'
        this.form.enabled = r.data.enabled
        this.form.username = r.data.username
      })
        .catch((e) => {
          console.log(e)
        })
      // GET client by Id
      await clientService.getClientByToken().then((response) => {
        this.clientId = response.data.id
      })
      try {
        roleService.getRoleById(userId).then(({ data }) =>
          data.forEach((element) => {
            data.push({
              idClient: this.clientId.id,
              name: element.name,
              nameRole: element.name,
              idRole: element.id
            })
            datos.push({
              idClient: this.clientId.id,
              name: element.name,
              nameRole: element.name,
              idRole: element.id
            })
          })
        )
        this.options = datos
        this.form.rolesClient = datos
      } catch (e) {
        console.log(e)
      }
      // GET the rest of the roles
      var datos2 = []
      clientService.getClientByToken().then((response) => {
        this.clientId = response.data.id
      })
      try {
        roleService.getRoles(this.clientId).then(({ data }) =>
          data.forEach((element) => {
            data.push({
              idClient: this.clientId.id,
              name: element.name,
              nameRole: element.name,
              idRole: element.id
            })
            datos2.push({
              idClient: this.clientId.id,
              name: element.name,
              nameRole: element.name,
              idRole: element.id
            })
          })
        )
        this.options = datos2
      } catch (e) {
        console.log(e)
      }
    },
    addTag (newTag) {
      const tag = {
        nameRole: newTag,
        code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
      }
      this.options.push(tag)
      this.form.rolesClient.push(tag)
    },
    async loadRoles () {
      var datos = []
      await clientService.getClientByToken().then((response) => {
        this.clientId = response.data.id
      })
      try {
        roleService.getRoles(this.clientId).then(({ data }) =>
          data.forEach((element) => {
            datos.push({
              idClient: this.clientId.id,
              name: element.name,
              nameRole: element.name,
              idRole: element.id
            })
          })
        )
        this.options = datos
        this.form.rolesClient = datos
      } catch (e) {
        console.log(e)
      }
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
