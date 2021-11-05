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
            <!-- <div class="form-row">
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
            </div> -->
            <!-- init add atribute -->
            <div class="form-row" v-for="(input,k) in form.inputs" :key="k">
              <div class="col-md-6 mb-3">
                <label for="atributo">Atributo</label>
                <input type="text" class="form-control" placeholder="Escribe un nombre de atributo" v-model="input.name">
              </div>
              <div class="col-md-5 mb-3">
                <label for="estatus">Estatus</label>
                <input type="text" class="form-control" placeholder="Escribe su estatus" v-model="input.st">
              </div>
              <div class="col-md-1 mb-3">
                <br><br>
                <span class="pointer pull-right" @click="remove(k)" v-show="k || ( !k && form.inputs.length > 1)"><img id="delete" src="/static/img/delete_2.svg" alt="Detele icon" title="Eliminar usuario"></span>
              </div>
              <div>
                <span class="btn btn-success" @click="add(k)" v-show="k == form.inputs.length-1">Añadir atributo</span>
              </div>
            </div>
            <!-- end -->
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
        realm: process.env.REALM_ENV,
        idClient: 'login',
        attributes: [],
        status: [],
        inputs: [{
          name: '',
          st: ''
        }]
      },
      formOptions: {
        validateAfterChanged: true
      },
      isSaving: false
    }
  },
  methods: {
    async submitRoleDetails () {
      var atributos = []
      var estados = []
      for (var i = 0; i < this.form.inputs.length; i++) {
        atributos[i] = this.form.inputs[i].name
        estados[i] = this.form.inputs[i].st
      }
      var form = {
        name: this.form.name,
        description: this.form.description,
        realm: this.form.realm,
        idClient: this.form.idClient,
        attributes: atributos,
        status: estados
      }
      try {
        clientService.getClientByToken().then((r) => {
          this.idClient = r.data.id
        })
        await HTTP.put('role/rolesC/updateRoleC/' + this.idClient + '/' + this.$route.params.id, {
          ...form
        })
        this.$swal({ type: 'info', timer: 3000, text: 'Se guardo exitosamente', showCancelButton: false, showConfirmButton: false })
        this.$router.push('/readRoles')
      } catch (e) {
        console.log(e)
      }
    },
    ver () {
      let listN = []
      let listS = []
      let st = []
      clientService.getClientByToken().then((r) => {
        HTTP.get('role/rolesC/' + r.data.id + '/' + this.$route.params.id).then(r => {
          Object.keys(r.data.attributes).forEach(function (item) {
            listN.push(item)
          })
          Object.values(r.data.attributes).forEach(function (item) {
            listS.push(item[0])
          })
          for (var i = 0; i < listS.length; i++) {
            st[i] = {
              name: listN[i],
              st: listS[i]
            }
          }
          console.log(st)
          this.form.inputs = st
          this.form.name = r.data.name
          this.form.description = r.data.description
        })
      })
    },
    add () {
      this.form.inputs.push({
        name: '',
        st: ''
      })
      console.log(this.inputs)
    },
    remove (index) {
      this.form.inputs.splice(index, 1)
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
