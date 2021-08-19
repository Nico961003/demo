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
                <div v-for="(slot, index) in form.attributes" :key="index">
                  <input type="text" class="form-control" v-model="form.attributes[index]">
                </div>
                <button type="button" class="btn btn-warning" @click="removeSlot(index);removeStatus(index)">&times;</button>
              </div>
              <div class="col-md-6 mb-3">
                <label for="name">Estatus</label>
                <div v-for="(status, index) in form.status" :key="index">
                  <input type="text" class="form-control" v-model="form.status[index]">
                </div>
              </div>
            </div>
            <div class="form-row" v-for="(atributo, index) in atributos" :key="index">
              <div class="col-md-6 mb-3">
                <input type="text" class="form-control" :value=" index ">
              </div>
              <div class="col-md-6 mb-3">
                <input type="text" class="form-control" :value=" atributo[0] ">
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
  name: 'edit-User',
  mounted: function mounted () {
    // this.addItem()
    this.ver()
  },
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
    ver () {
      try {
        HTTP.get('role/rolesC/5bb80642-35cf-47c2-a1eb-3009e411db3c/' + this.$route.params.id).then(r => {
          console.log(r.data.attributes)
          this.atributos = r.data.attributes
          this.atributos = this.atributos
          console.log(this.atributos.ventas.length)
          this.form = {
            name: r.data.name,
            description: r.data.description
          }
          return this.atributos
        })
      } catch (e) {
        console.log(e)
      }
    },
    addItem () {
      this.form.attributes.push({
        value: 'prueba'
      })
      this.form.items2.push({
        value: ['true']
      })
    },
    removeItem (index) {
      this.form.items.splice(index, 1)
      this.form.items2.splice(index, 1)
    },
    addSlot () {
      // this.form.attributes.push({value: ''})
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
