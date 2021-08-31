<template lang='html'>
  <section class='dashboard'>
    <!-- Page Title Header Starts-->
    <div class='row page-title-header'>
      <div class='col-12'>
        <div class='page-header'>
          <h4 class='page-title'>Agregar Rol</h4>
        </div>
      </div>
    </div>
    <!-- Page Title Header Ends-->
    <div class="container">
        <div class="card pl-4 pt-5 pb-5 pr-4 mt-3">
            <form action="" @submit.prevent="submitRoleDetails" class="was-validated">
            <div class="form-row">
              <div class="col-md-6 mb-3">
                <label for="name">Nombre del Rol</label>
                <input type="text" class="form-control" id="name" name="name" v-model="form.name" placeholder="Nombre del rol" value="" required>
                <div class="valid-feedback">
                  Es aceptable!
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <label for="description">Descripción</label>
                <input type="text" class="form-control" id="description" name="description" v-model="form.description" placeholder="Descripción" value="" required>
                <div class="valid-feedback">
                  Es aceptable!
                </div>
              </div>
            </div>
            <div class="form-row">
              <div class="col-md-6 mb-3">
                <label for="name">Atributo</label>
                <button type="button" class="btn btn-success" @click="addSlot();addStatus()">Añadir uno</button>
                <div class="mb-3" v-for="(slot, index) in form.attributes" :key="index">
                  <input type="text" class="form-control" v-model="form.attributes[index]" placeholder="edíteme">
                </div>
                <button type="button" class="btn btn-warning" @click="removeSlot(index);removeStatus(index)">&times;</button>
              </div>
              <div class="col-md-6 mb-3">
                <label for="name">Estatus</label>
                <div class="mb-3" v-for="(status, index) in form.status" :key="index">
                  <input type="text" class="form-control" v-model="form.status[index]" placeholder="edíteme">
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
  name: 'add-User',
  data () {
    return {
      form: {
        name: '',
        description: '',
        realm: 'SpringBoot',
        idClient: 'login',
        attributes: [],
        status: []
      },
      formOptions: {
        validateAfterChanged: true
      },
      isSaving: false
    }
  },
  methods: {
    async submitRoleDetails () {
      try {
        await HTTP.post('role/createRole', {
          ...this.form
        })
        this.$swal({ type: 'info', timer: 3000, text: 'Se guardo exitosamente', showCancelButton: false, showConfirmButton: false })
        this.$router.push('/readRoles')
      } catch (e) {
        console.log(e)
      }
    },
    addSlot () {
      this.form.attributes.push({value: ''})
    },
    removeSlot (index) {
      this.form.attributes.splice(index, 1)
    },
    addStatus () {
      this.form.status.push({value: 'false'})
    },
    removeStatus (index) {
      this.form.status.splice(index, 1)
    }
  },
  mounted () {
    this.addSlot()
    this.addStatus()
  }
}
</script>

<style>
</style>
