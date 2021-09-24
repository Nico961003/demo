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
      <div class="card pl-4 pt-5 pb-5 pr-4 mt-3">
        <b-container fluid>
          <!-- Main table element -->
          <div style="overflow-x:auto;">
          <table id="tblRoles" class="styled-table">
            <thead>
              <tr>
                  <th hidden>Id</th>
                  <th>#</th>
                  <th>Nombre del rol</th>
                  <th>Descripción</th>
                  <th>Acciones</th>
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
                      <router-link :to="'/editRole/' + role.name">
                        <img id="modify" src="/static/img/modify.svg" alt="Modify icon" title="Modificar rol">
                      </router-link>
                        <a @click="eliminar(role.name)" class="pointer"><img id="delete" src="/static/img/delete_2.svg" alt="Detele icon" title="Eliminar rol"></a>
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
  </section>
</template>

<script lang='js'>
import { HTTP } from '../../logic/http-common'
import 'jquery/dist/jquery.min.js'
import 'datatables.net-dt/js/dataTables.dataTables'
import 'datatables.net-dt/css/jquery.dataTables.min.css'
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
      isSaving: false
    }
  },
  methods: {
    loadRoles () {
      var roleId = decodedToken.getTokenDecode()
      try {
        HTTP.get('client/viewClient/' + roleId.azp).then(r => {
          this.idClient = r.data
          HTTP.get('role/rolesC/' + this.idClient.id).then(r => {
            this.roles = r.data
          })
        })
      } catch (e) {
        console.log(e)
      }
    },
    loadRoleById (roleId) {
      try {
        HTTP.get('client/viewClient/' + roleId).then(r => {
          this.idClient = r.data
          HTTP.get('role/rolesC/' + this.idClient.id).then(r => {
            this.roles = r.data
          })
        })
      } catch (e) {
        console.log(e)
      }
    },
    async ver (roleId) {
      try {
        await HTTP.get('role/role/' + roleId).then(r => {
          this.role = r.data
          // console.log(this.role)
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
      var clientId = decodedToken.getTokenDecode()
      try {
        await HTTP.get('client/viewClient/' + clientId.azp).then(r => {
          this.clientId = r.data
          console.log(this.clientId)
          HTTP.delete('role/deleteRoleC/' + this.clientId.id + '/' + roleId)
          this.$swal({ type: 'info', timer: 1000, text: 'Se elimino exitosamente', showCancelButton: false, showConfirmButton: false })
          this.loadRoles()
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
    var roleId = decodedToken.getTokenDecode()
    HTTP.get('client/viewClient/' + roleId.azp).then(r => {
      this.idClient = r.data
      HTTP.get('role/rolesC/' + this.idClient.id).then(r => {
        this.roles = r.data
        $('#tblRoles').DataTable({
          // responsive: true,
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
  width: 50%;
  padding: 13px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

</style>
