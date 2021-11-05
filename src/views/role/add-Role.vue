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
            <!-- <div class="form-row">
              <div class="col-md-6 mb-3">
                <label for="name">Atributo</label>
                <button type="button" class="btn btn-success" @click="addSlot();addStatus()">Añadir uno</button>
                <div class="mb-3" v-for="(slot, index) in form.attributes" :key="index">
                  <input type="text" class="form" v-model="form.attributes[index]" placeholder="Ingresa un nombre de atributo"  onfocus="this.value=''">
                </div>
                <button type="button" class="btn btn-warning" @click="removeSlot(index);removeStatus(index)">&times;</button>
              </div>
              <div class="col-md-6 mb-3">
                <label for="name">Estatus</label>
                <div class="mb-3" v-for="(status, index) in form.status" :key="index">
                  <select id="selectStatus" type="text" class="select" v-model="form.status[index]">
                    <option disabled selected>Selecciona una opción</option>
                    <option>true</option>
                    <option>false</option>
                  </select>
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

export default {
  name: 'add-User',
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
      // console.log(this.form.inputs)
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
        await HTTP.post('role/createRole', {
          ...form
        })
        this.$swal({ type: 'info', timer: 3000, text: 'Se guardo exitosamente', showCancelButton: false, showConfirmButton: false })
        this.$router.push('/readRoles')
      } catch (e) {
        console.log(e)
      }
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
  },
  mounted () {
    this.realm = process.env.REALM_ENV
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
  height: 48.8%;
  padding: 13px 20px;
  margin: 7px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
</style>
