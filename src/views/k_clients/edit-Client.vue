<template lang='html'>
  <section class='dashboard'>
    <!-- Page Title Header Starts-->
    <div class='row page-title-header'>
      <div class='col-12'>
        <div class='page-header'>
          <h4 class='page-title'>Editar Cliente</h4>
        </div>
      </div>
    </div>
    <!-- Page Title Header Ends-->
    <div class="container">
        <div class="card pl-4 pt-5 pb-5 pr-4 mt-3">
            <form action="" @submit.prevent="submitUserDetails" class="was-validated">
            <div class="form-row">
              <div class="col-md-6 mb-3">
                <label for="name">Nombre</label>
                <input type="text" class="form-control" id="name" name="name" v-model="form.name" placeholder="Nombre del cliente"  required disabled>
                <div class="valid-feedback">
                  Es aceptable!
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <label for="description">Descripción</label>
                <input type="text" class="form-control" id="description" name="description" v-model="form.description" placeholder="Descripción" required>
                <div class="valid-feedback">
                  Es aceptable!
                </div>
              </div>
            </div>
            <div class="form-row">
              <div class="col-md-6 mb-3">
                <label for="rootUrl">Root URL</label>
                <input type="url" class="form-control" id="rootUrl" name="rootUrl" v-model="form.rootUrl" placeholder="Root URL : http://example.com"  required>
                <div class="valid-feedback">
                  Es aceptable!
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <label for="adminUrl">Admin URL</label>
                <div class="input-group">
                <input type="url" class="form-control" id="adminUrl" name="adminUrl" v-model="form.adminUrl" placeholder="Admin URL : http://example.com"  required>
                <div class="valid-feedback">
                  Es aceptable!
                </div>
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
import { HTTP } from '../../logic/http-common'

export default {
  name: 'edit-Client',
  mounted () {
    var clientId = this.$route.params.id
    this.ver(clientId)
  },
  data () {
    return {
      form: {
        name: '',
        rootUrl: '',
        adminUrl: '',
        realm: process.env.REALM_ENV,
        description: '',
        enabled: true
      },
      formOptions: {
        validateAfterChanged: true
      },
      isSaving: false
    }
  },
  methods: {
    async submitUserDetails () {
      try {
        await HTTP.put('client/updateClient/' + this.$route.params.id + '', {
          ...this.form
        })
        this.$swal({ type: 'info', timer: 3000, text: 'Se actualizo exitosamente', showCancelButton: false, showConfirmButton: false })
        console.log(this.form)
        this.$router.push('/readClient')
      } catch (e) {
        console.log(e)
      }
    },
    async ver (clientId) {
      try {
        await HTTP.get('client/viewClient/' + clientId).then(r => {
          console.log(r.data)
          this.form = {
            name: r.data.clientId,
            rootUrl: r.data.rootUrl,
            adminUrl: r.data.adminUrl,
            realm: process.env.REALM_ENV,
            enabled: true,
            description: r.data.description
          }
        })
      } catch (e) {
        console.log(e)
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
