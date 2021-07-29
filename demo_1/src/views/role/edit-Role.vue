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
  name: 'edit-Role',
  mounted () {
    var roleId = this.$route.params.id
    this.ver(roleId)
  },
  data () {
    return {
      form: {
        name: ''
        // ,
        // description: '',
        // realm: 'SpringBoot'
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
        await HTTP.put('role/updateRole', {
          ...this.form
        })
        alert('Saved Successfully')
        // console.log(this.form)
        this.$router.push('/readRoles')
      } catch (e) {
        console.log(e)
        alert(e.message)
      }
    },
    async ver (roleId) {
      try {
        await HTTP.get('role/role/' + roleId).then(r => {
          this.form = {
            name: r.data.name
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
