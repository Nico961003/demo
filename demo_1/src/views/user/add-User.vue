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
                <label for="multiple">Rol(es)</label>
                <select id="role" name="role" v-model="role" placeholder="Selecciona un rol" multiple>
                  <option value="user">user</option>
                  <option value="user2">user2</option>
                  <option value="user3">user3</option>
                  <option value="user4">user4</option>
                  <option value="user5">user5</option>
                </select>
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
// import $ from 'jquery'
// import Choices from './choices.js'
// $(document).ready(function () {
//   // const choices = new Choices()
//   const multipleCancelButton = new Choices('#choices-multiple-remove-button', {
//     removeItemButton: true,
//     maxItemCount: 5,
//     searchResultLimit: 5,
//     renderChoiceLimit: 5
//   })
//   console.log(multipleCancelButton)
// })

export default {
  name: 'add-User',
  mounted () {
  },
  data () {
    return {
      form: {
        firstname: '',
        lastname: '',
        email: '',
        realm: 'SpringBoot',
        role: 'user',
        enable: false,
        username: '',
        password: ''
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
        this.$router.push('/readUsers')
      } catch (e) {
        console.log(e)
        alert(e.message)
      }
    }
  }
}
</script>

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
