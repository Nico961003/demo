<template>
  <section class="dashboard">
    <!-- Page Title Header Starts-->
    <div class="row page-title-header">
      <div class="col-12">
        <div class="page-header">
          <h4 class="page-title">Clientes</h4>
        </div>
      </div>
    </div>
    <!-- Page Title Header Ends-->
      <div class="card pl-4 pt-5 pb-5 pr-4 mt-3">
        <b-container fluid>
          <v-client-table
            :data="clients"
            :options="tableOptions"
            :columns="tableColumns">
            <template slot="index" slot-scope="data">{{ data.index }}</template>
            <template slot="enabled" slot-scope="{row}">
              <span v-if="row.enabled == true" class="pointer"><center><img id="active" src="/static/img/active.svg" alt="Active icon" title="Usuario Activo"></center></span>
              <span v-if="row.enabled == false" class="pointer"><center><img id="inactive" src="/static/img/inactive.svg" alt="Inactive icon" title="Usuario Inactivo"></center></span>
            </template>
            <span slot="acciones" slot-scope="{row}">
              <center>
                <!-- <span @click="modify(row)" class="pointer"><img id="modify" src="/static/img/modify.svg" alt="Modify icon" title="Modificar rol"></span> -->
                <span @click="eliminar(row)" class="pointer"><img id="delete" src="/static/img/delete_2.svg" alt="Detele icon" title="Eliminar rol"></span>
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
import 'datatables.net-dt/js/dataTables.dataTables'
import 'datatables.net-dt/css/jquery.dataTables.min.css'
import $ from 'jquery'
import swal from 'sweetalert2'
window.swal = swal

export default {
  name: 'read-Client',
  methods: {
    loadClients () {
      HTTP.get('client/viewClients').then(r => {
        this.clients = r.data
        // console.log(this.clients)
      })
    },
    modify (row) {
      this.$router.push('/editClient/' + row.id)
    },
    eliminar (row) {
      swal({
        title: '¡Advertencia!',
        text: '¿Eliminar el cliente : ' + row.name + '?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Si, eliminar',
        cancelButtonText: 'No, cancelar'
      }).then((result) => {
        if (result.value) {
          this.eliminaRegistro(row.id)
        } else {}
      })
    },
    async eliminaRegistro (clientId) {
      try {
        await HTTP.delete('client/deleteClient/' + clientId)
        this.$swal({ type: 'info', timer: 1000, text: 'Se elimino exitosamente', showCancelButton: false, showConfirmButton: false })
        this.loadClients()
      } catch (e) {
        console.log(e)
      }
    }
  },
  created () {
    var t = $('#tblClients').DataTable()
    t.destroy()
    $('#tblClients tbody').empty()
    $('#tblClients').DataTable()
    this.loadClients()
  },
  data () {
    return {
      clients: [],
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
        'adminUrl',
        'rootUrl',
        'enabled',
        'acciones'
      ],
      tableOptions: {
        headings: {
          index: '#',
          id: 'id',
          name: 'Nombre',
          description: 'Descripción',
          adminUrl: 'admin URL',
          rootUrl: 'root URL',
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
        sortable: ['name', 'description', 'enabled'],
        filterable: ['name', 'description', 'enabled']
      }
    }
  },
  mounted () {
    HTTP.get('client/viewClients').then(r => {
      this.clients = r.data
    })
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
