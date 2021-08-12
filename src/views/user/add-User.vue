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
import decodedToken from '../../logic/decodeToken'
import userService from '../../services/userService'
// import roleService from '../../services/roleService'
Vue.component('multiselect', Multiselect)

export default {
  name: 'add-User',
  components: {
    Multiselect
  },
  mounted () {
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
        realm: 'SpringBoot',
        enabled: false,
        username: '',
        group: 'user',
        password: '',
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
      var roleId = decodedToken.getTokenDecode()
      // console.log(roleId)
      try {
        await HTTP.get('client/viewClient/' + roleId.azp).then(r => {
          this.clientId = r.data
          console.log(this.clientId)
          try {
            HTTP.get('role/rolesC/' + this.clientId.id).then(({ data }) =>
              data.forEach((element) => {
                data.push({
                  idClient: this.clientId.id,
                  name: element.name,
                  idRole: element.id
                })
                this.form.rolesClient = data
                this.options = data
                // console.log(data)
              })
            )
          } catch (e) {
            console.log(e)
          }
        })
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
body {
  background-color: #fafafa !important;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
.vue-form-generator > div {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  flex-grow: 1;
}
.form-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 2%;
  width: 50%;
}
.field-wrap,
.wrapper {
  width: 100%;
}
.dropList {
  z-index: 10;
  background-color: #fff;
  position: relative;
  width: 40%;
  top: 5px;
  right: 12px;
}
legend {
  margin: 10px 0 20px 18px;
  font-size: 16px;
  font-weight: bold;
  text-align: left;
}
.hint {
  font-size: 10px;
  font-style: italic;
  color: purple;
}
.help-block {
  color: red;
}
</style>
