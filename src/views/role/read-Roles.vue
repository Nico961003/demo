<template>
  <section class="dashboard">
    <!-- Page Title Header Starts-->
    <div class="row page-title-header">
      <div class="col-12">
        <div class="page-header">
          <h4 class="page-title">Roles</h4>
        </div>
      </div>
    </div>
      <div class="card pl-4 pt-5 pb-5 pr-4 mt-3">
        <b-container fluid>
          <v-client-table
            :data="rols"
            :options="tableOptions"
            :columns="tableColumns">
            <template slot="index" slot-scope="data">{{ data.index }}</template>
            <span slot="acciones" slot-scope="{row}">
              <center>
                <span @click="modify(row)" class="pointer"><img id="modify" src="/static/img/modify.svg" alt="Modify icon" title="Modificar usuario"></span>
                <span @click="eliminar(row)" class="pointer"><img id="delete" src="/static/img/delete_2.svg" alt="Detele icon" title="Eliminar usuario"></span>
              </center>
            </span>
          </v-client-table>
        </b-container>
      </div>
  </section>
</template>

<script lang='js'>
import { HTTP } from '../../logic/http-common'
import 'jquery/dist/jquery.min.js'
import $ from 'jquery'
import swal from 'sweetalert2'
import decodedToken from '../../logic/decodeToken'
window.swal = swal

export default {
  name: 'read-Roles',
  data () {
    return {
      roles: {},
      client: '',
      form: {
        client: ''
      },
      formOptions: {
        validateAfterChanged: true
      },
      isSaving: false,
      rols: [],
      tableColumns: [
        'index',
        'id',
        'name',
        'description',
        'acciones'
      ],
      tableOptions: {
        headings: {
          index: '#',
          id: 'id',
          name: 'Nombre del Rol',
          description: 'Descripción',
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
        sortable: ['name', 'description'],
        filterable: ['name', 'description']
      }
    }
  },
  methods: {
    loadRoles () {
      try {
        this.idClient = localStorage.getItem('clientName')
        HTTP.get('role/rolesC/' + this.idClient).then(r => {
          // console.log(r.data)
          this.roles = r.data
          this.rols = r.data
        })
      } catch (e) {
        console.log(e)
      }
    },
    loadRoleById (roleId) {
      try {
        this.idClient = localStorage.getItem('clientName')
        HTTP.get('role/rolesC/' + this.idClient).then(r => {
          this.roles = r.data
        })
      } catch (e) {
        console.log(e)
      }
    },
    async ver (roleId) {
      try {
        await HTTP.get('role/role/' + roleId).then(r => {
          this.role = r.data
        })
      } catch (e) {
        console.log(e)
      }
    },
    modify (roleId) {
      this.$router.push('/editRole/' + roleId.name)
    },
    eliminar (roleId) {
      swal({
        title: '¡Advertencia!',
        text: '¿Eliminar el rol : ' + roleId.name + '?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Si, eliminar',
        cancelButtonText: 'No, cancelar'
      }).then((result) => {
        if (result.value) {
          this.eliminaRegistro(roleId.name)
        } else {}
      })
    },
    async eliminaRegistro (roleId) {
      var clientId = decodedToken.getTokenDecode()
      try {
        await HTTP.get('client/viewClient/' + clientId.azp).then(r => {
          this.clientId = r.data
          // console.log(this.clientId)
          HTTP.delete('role/deleteRoleC/' + this.clientId.id + '/' + roleId)
          this.$swal({ type: 'info', timer: 1000, text: 'Se elimino exitosamente', showCancelButton: false, showConfirmButton: false })
          this.$router.go(0)
        })
      } catch (e) {
        console.log(e)
      }
    },
    loadClients () {
      let list = []
      HTTP.get('client/viewClients').then(r => {
        Object.values(r.data).forEach(function (item) {
          if (item.clientId !== 'account' && item.clientId !== 'account-console' && item.clientId !== 'admin-cli' && item.clientId !== 'broker' && item.clientId !== 'realm-management' && item.clientId !== 'security-admin-console') {
            list.push(item.clientId)
          }
        })
        this.client = list
      })
    }
  },
  created () {
    var t = $('#tblRoles').DataTable()
    t.destroy()
    $('#tblRoles tbody').empty()
    $('#tblRoles').DataTable()
    this.loadRoles()
  },
  mounted () {
    this.idClient = localStorage.getItem('clientName')
    HTTP.get('role/rolesC/' + this.idClient).then(r => {
      this.roles = r.data
      $('#tblRoles').DataTable({
        ordering: true,
        select: true,
        'columnDefs': [
          {'className': 'dt-center', 'targets': '_all'}
        ],
        'language': {
          'url': '//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json'
        }
      })
    })
    this.loadClients()
  },
  computed: {
    sortOptions () {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key }
        })
    }
  }
}
</script>

<style>
</style>
