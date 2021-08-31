<template lang='html'>
  <section class='dashboard'>
    <!-- Page Title Header Starts-->
    <div class='row page-title-header'>
      <div class='col-12'>
        <div class='page-header'>
          <h4 class='page-title'>Agregar Cliente</h4>
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
                <input type="text" class="form-control" id="name" name="name" v-model="form.name" placeholder="Nombre del cliente"  required>
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
  name: 'add-Client',
  mounted () {
    this.realm = process.env.REALM_ENV
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
        await HTTP.post('client/createClient', {
          ...this.form
        })
        this.$swal({ type: 'info', timer: 3000, text: 'Se guardo exitosamente', showCancelButton: false, showConfirmButton: false })
        this.$router.push('/readClients')
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style>
</style>
