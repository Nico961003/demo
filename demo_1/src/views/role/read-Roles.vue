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
    <!-- Page Title Header Ends-->
    <div>
      <div class="card pl-4 pt-5 pb-5 pr-4 mt-3">
        <b-container fluid>
          <!-- Main table element -->
          <div class="container-fluid">
          <table id="tblRoles" class="table table-hover table-striped table-bordered">
            <thead class="thead-dark">
              <tr>
                  <th hidden>Id</th>
                  <th>#</th>
                  <th>Nombre del rol</th>
                  <th>Descripción</th>
                  <th>Operaciones</th>
               </tr>
            </thead>
            <tbody>
              <tr v-for="(role, index) in roles" :key="index">
                  <td hidden>{{role.id}}</td>
                  <td>{{index + 1}}</td>
                  <td>{{role.name}}</td>
                  <td>{{role.description}}</td>
                  <td v-if="role.name !== 'uma_authorization' && role.name !== 'offline_access'">
                    <template>
                      <router-link class="btn btn-warning" :to="'/editRole/' + role.name">Actualizar</router-link>
                      <b-button size="sm" class="btn btn-danger" @click="eliminar(role.name)">
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
    async loadRoles () {
      try {
        await HTTP.get('role/roles').then(r => {
          this.roles = r.data
          console.log(this.roles)
        })
      } catch (e) {
        console.log(e)
      }
    },
    async ver (roleId) {
      try {
        await HTTP.get('role/role/' + roleId).then(r => {
          this.role = r.data
          console.log(this.role)
        })
      } catch (e) {
        console.log(e)
      }
    },
    eliminar (roleId) {
      swal({
        title: '¡Advertencia!',
        text: '¿Eliminar el rol : ' + roleId + '?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Si, eliminar',
        cancelButtonText: 'No, cancelar'
      }).then((result) => {
        if (result.value) {
          this.eliminaRegistro(roleId)
        } else {}
      })
    },
    async eliminaRegistro (roleId) {
      try {
        await HTTP.delete('role/deleteRole/' + roleId)
        this.$swal({ type: 'info', timer: 1000, text: 'Se elimino exitosamente', showCancelButton: false, showConfirmButton: false })
        this.loadRoles()
      } catch (e) {
        console.log(e)
      }
    }
  },
  created () {
    var t = $('#tblRoles').DataTable()
    t.destroy()
    $('#tblRoles tbody').empty()
    $('#tblRoles').DataTable()
    this.loadRoles()
  },
  data () {
    return {
      roles: {}
    }
  },
  mounted () {
    HTTP.get('role/roles').then(r => {
      this.roles = r.data
      $('#tblRoles').DataTable({
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
