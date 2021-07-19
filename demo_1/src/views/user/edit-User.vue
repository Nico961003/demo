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
                <vue-form-generator tag="div" :schema="schema" :options="formOptions" :model="model" />
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

export default {
  name: 'edit-User',
  mounted () {
    var userId = this.$route.params.id
    this.ver(userId)
  },
  data () {
    return {
      model: {
        firstname: 'ok',
        lastname: '',
        email: '',
        realm: 'SpringBoot',
        role: 'user',
        enable: '',
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
      this.userId = this.$route.params.id
      try {
        await HTTP.put('user/updateUser/' + this.userId, {
          ...this.model
        })
        alert('Updated Successfully')
        console.log(this.model)
        this.$router.push('/readUsers')
      } catch (e) {
        console.log(e)
        alert(e.message)
      }
    },
    async ver (userId) {
      HTTP.get('user/viewUser/' + userId).then(r => {
        this.user = r.data
        console.log(this.user)
        $('#nombres').val(this.user.firstName)
        $('#apellidos').val(this.user.lastName)
        $('#correo-electronico').val(this.user.email)
        $('#username').val(this.user.username)
        $('#password').val('prueba')
      })
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
