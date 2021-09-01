<template lang='html'>
  <section class='dashboard'>
    <!-- Page Title Header Starts-->
    <div class='row page-title-header'>
      <div class='col-12'>
        <div class='page-header'>
          <h4 class='page-title'>Editar Rol</h4>
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
                <input type="text" class="form-control" id="name" name="name" v-model="form.name" placeholder="Nombre del rol" required disabled>
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
                  <input type="text" class="form" v-model="form.attributes[index]" placeholder="Ingresa un nombre de atributo">
                </div>
                <button type="button" class="btn btn-warning" @click="removeSlot(index);removeStatus(index)">&times;</button>
              </div>
              <div class="col-md-6 mb-3">
                <label for="name">Estatus</label>
                <div class="mb-3" v-for="(status, index) in form.status" :key="index">
                  <input type="text" class="form-control" v-model="form.status[index]">
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
import clientService from '../../services/clientService'

export default {
  name: 'edit-User',
  mounted: function mounted () {
    this.realm = process.env.REALM_ENV
    this.ver()
    clientService.getClientByToken().then((r) => {
      this.idClient = r.data.id
    })
  },
  data () {
    return {
      form: {
        name: '',
        description: '',
        idClient: '',
        realm: process.env.REALM_ENV,
        clientRole: 'true',
        attributes: [],
        status: ''
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
        clientService.getClientByToken().then((r) => {
          this.idClient = r.data.id
        })
        await HTTP.put('role/rolesC/updateRoleC/' + this.idClient + '/' + this.$route.params.id, {
          ...this.form
        })
        this.$swal({ type: 'info', timer: 3000, text: 'Se guardo exitosamente', showCancelButton: false, showConfirmButton: false })
        this.$router.push('/readRoles')
      } catch (e) {
        console.log(e)
      }
    },
    ver () {
      let list = []
      clientService.getClientByToken().then((r) => {
        HTTP.get('role/rolesC/' + r.data.id + '/' + this.$route.params.id).then(r => {
          this.form.attributes = Object.keys(r.data.attributes)
          Object.values(r.data.attributes).forEach(function (item) {
            list.push(item[0])
          })
          this.form.status = list
          this.form.name = r.data.name
          this.form.description = r.data.description
        })
      })
    },
    addItem () {
      this.form.attributes.push({
        value: 'prueba'
      })
      this.form.items2.push({
        value: 'true'
      })
    },
    removeItem (index) {
      this.form.items.splice(index, 1)
      this.form.items2.splice(index, 1)
    },
    addSlot () {
      this.form.attributes.push({
        value: 'true'
      })
    },
    removeSlot (index) {
      this.form.attributes.splice(index, 1)
    },
    addStatus () {
      this.form.status.push({value: ''})
    },
    removeStatus (index) {
      this.form.status.splice(index, 1)
    }
  }
}
</script>

<style>
input[type=text] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.select {
  width: 100%;
  padding: 13px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
</style>
