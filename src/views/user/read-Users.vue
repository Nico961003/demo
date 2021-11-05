<template>
  <section class="dashboard">
    <!-- Page Title Header Starts-->
    <div class="row page-title-header">
      <div class="col-12">
        <div class="page-header">
          <h4 class="page-title">Usuarios</h4>
        </div>
      </div>
    </div>
    <!-- Page Title Header Ends-->
      <div class="card pl-4 pt-5 pb-5 pr-4 mt-3">
        <b-container fluid>
          <v-client-table
            :data="users"
            :options="tableOptions"
            :columns="tableColumns">
            <template slot="index" slot-scope="data">{{ data.index }}</template>
            <template slot="enabled" slot-scope="{row}">
              <span v-if="row.enabled == true" class="pointer"><center><img id="active" src="/static/img/active.svg" alt="Active icon" title="Usuario Activo"></center></span>
              <span v-if="row.enabled == false" class="pointer"><center><img id="inactive" src="/static/img/inactive.svg" alt="Inactive icon" title="Usuario Inactivo"></center></span>
            </template>
            <span slot="acciones" slot-scope="{row}">
              <center>
                <span @click="modify(row)" class="pointer"><img id="modify" src="/static/img/modify.svg" alt="Modify icon" title="Modificar rol"></span>
                <span @click="eliminar(row)" class="pointer"><img id="delete" src="/static/img/delete_2.svg" alt="Detele icon" title="Eliminar rol"></span>
              </center>
            </span>
          </v-client-table>
        </b-container>
      </div>
  </section>
</template>

<script lang='js'>
import userService from '../../services/userService'
import $ from 'jquery'

export default {
  name: 'read-Users',
  computed: {
    sortOptions () {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key }
        })
    }
  },
  methods: {
    async loadUsers () {
      await userService.getUsers().then((response) => {
        this.users = response.data
      })
        .catch((e) => {
          console.log(e)
        })
    },
    modify (row) {
      this.$router.push('/editUser/' + row.id)
    },
    eliminar (row) {
      this.$swal({
        title: '¡Advertencia!',
        text: '¿Eliminar a ' + row.username + '?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Si, eliminar',
        cancelButtonText: 'No, cancelar'
      }).then((result) => {
        if (result.value) {
          userService.deleteUser(row.id).then((response) => {
            this.$swal({ type: 'info', timer: 1000, text: 'Se elimino exitosamente', showCancelButton: false, showConfirmButton: false })
            this.loadUsers()
          })
            .catch((e) => {
              console.log(e)
            })
        } else {}
      })
    }
  },
  created () {
    var t = $('#tblUsers').DataTable()
    t.destroy()
    $('#tblUsers tbody').empty()
    $('#tblUsers').DataTable()
    this.loadUsers()
  },
  data () {
    return {
      users: [],
      tableColumns: [
        'index',
        'id',
        'firstName',
        'lastName',
        'username',
        'email',
        'enabled',
        'acciones'
      ],
      tableOptions: {
        headings: {
          index: '#',
          id: 'id',
          firstName: 'Nombre',
          lastName: 'Apellido(s)',
          username: 'Username',
          email: 'Correo electronico',
          enabled: 'Estatus',
          acciones: 'Acciones'
        },
        filterByColumn: false,
        texts: {
          count: 'Mostrando del {from} al {to} de {count} Registros|{count} Registros|1 Registro',
          first: 'Primero',
          last: 'Ultimo',
          filter: false,
          filterPlaceholder: 'Buscar . . .',
          limit: 'Mostrar :',
          page: 'Pagina : ',
          noResults: 'No se encontraron datos',
          filterBy: 'Filtro por {column}',
          loading: 'Cargando...',
          defaultOption: 'Selecciona {column}',
          columns: 'Columnas'
        },
        hiddenColumns: ['id'],
        perPage: 5,
        perPageValues: [5],
        sortable: ['firstName', 'lastName', 'username', 'enabled'],
        filterable: ['firstName', 'lastName', 'username', 'enabled']
      }
    }
  },
  mounted: function () {
    userService.getUsers().then((response) => {
      this.users = response.data
    })
      .catch((e) => {
        console.log(e)
      })
  }
} // meter iconos a las operaciones
</script>

<style scoped="lang">
</style>
