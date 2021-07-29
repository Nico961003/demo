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
    <div>
      <div class="card pl-4 pt-5 pb-5 pr-4 mt-3">
        <b-container fluid>
          <!-- Main table element -->
          <div class="container-fluid">
          <table id="tblClients" class="table table-hover table-striped table-bordered">
            <thead>
              <tr>
                  <th hidden>Id</th>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Admin URL</th>
                  <th>baseURL</th>
                  <th>Operaciones</th>
               </tr>
            </thead>
            <tbody>
              <tr v-for="(client, index) in clients" :key="index">
                  <td hidden>{{client.id}}</td>
                  <td>{{index + 1}}</td>
                  <td>{{client.clientId}}</td>
                  <td>{{client.description}}</td>
                  <td>{{client.adminUrl}}</td>
                  <td>{{client.baseUrl}}</td>
                  <td v-if="client.clientId !== 'account' && client.clientId !== 'account-console' && client.clientId !== 'admin-cli' && client.clientId !== 'broker' && client.clientId !== 'realm-management' && client.clientId !== 'security-admin-console'">
                    <template>
                      <router-link class="btn btn-warning" :to="'/editClient/' + client.id">Actualizar</router-link>
                      <b-button size="sm" class="btn btn-danger" @click="eliminar(client.id)">
                        Eliminar
                      </b-button>
                    </template>
                  </td>
                  <td v-else>
                    Por seguridad, no habilitadas
                  </td>
              </tr>
            </tbody>
          </table>
          </div>
        </b-container>
      </div>
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
  methods: {
    loadClients () {
      HTTP.get('client/viewClients').then(r => {
        this.clients = r.data
        console.log('CLIENTES')
        console.log(this.clients)
      })
    },
    eliminar (clientId) {
      swal({
        title: '¡Advertencia!',
        text: '¿Eliminar el cliente : ' + clientId + '?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Si, eliminar',
        cancelButtonText: 'No, cancelar'
      }).then((result) => {
        if (result.value) {
          this.eliminaRegistro(clientId)
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
      clients: {}
    }
  },
  mounted () {
    HTTP.get('client/viewClients').then(r => {
      this.clients = r.data
      console.log('CLIENTES')
      console.log(this.clients)
      $('#tblClients').DataTable({
        responsive: true,
        scrollY: 540,
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
