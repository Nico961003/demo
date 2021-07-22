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
            <form action="" @submit.prevent="submitUserDetails">
            <div class="form-row">
              <div class="col-md-6 mb-3">
                <label for="firstname">Nombre(s)</label>
                <input type="text" class="form-control" id="firstname" name="firstname" v-model="form.firstname" placeholder="Nombre(s)" value="" required>
                <div class="valid-tooltip">
                  Es aceptable!
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <label for="lastname">Apellido(s)</label>
                <input type="text" class="form-control" id="lastname" name="lastname" v-model="form.lastname" placeholder="Apellido(s)" value="" required>
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
                  <label class="typo__label">Rol(es)</label>
                  <multiselect v-model="form.role" tag-placeholder="Añadir nuevo rol" placeholder="Busca o añade un rol" label="name" track-by="code" :options="options" :multiple="true" :taggable="true" @tag="addTag"></multiselect>
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
//import userFormSchema from '../../forms/userFormSchema'
import { HTTP } from '../../logic/http-common'
import Vue from 'vue'
import Multiselect from 'vue-multiselect'

Vue.component('multiselect', Multiselect)
export default {
  name: 'edit-User',
  components: { Multiselect },
  mounted () {
  },
  data () {
    return {
      form: {
        firstname: '',
        lastname: '',
        email: '',
        realm: 'SpringBoot',
        enable: false,
        username: '',
        role: '',
        password: ''
      },
      schema: userFormSchema,
      formOptions: {
        validateAfterChanged: true
      },
      isSaving: false,
      tag: [
        { name: 'user', code: 'user' }
      ],
      options: [
        { name: 'single', code: 'vu' },
        { name: 'admin', code: 'js' },
        { name: 'otro', code: 'os' }
      ]
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
        this.$router.push('/readUsers')
      } catch (e) {
        console.log(e)
        alert(e.message)
      }
    },
    addTag (newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
      }
      this.options.push(tag)
      this.value.push(tag)
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
