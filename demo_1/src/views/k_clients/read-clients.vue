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
          <table id="tblUsers" class="table table-hover table-striped table-bordered">
            <thead class="thead-dark">
              <tr>
                  <th hidden>Id</th>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Admin URL</th>
                  <th>baseURL</th>
               </tr>
            </thead>
            <tbody>
              <tr v-for="(user, index) in users" :key="index">
                  <td hidden>{{user.id}}</td>
                  <td>{{index + 1}}</td>
                  <td>{{user.username}}</td>
                  <td>{{user.firstName}} {{user.lastName}}</td>
                  <td>{{user.email}}</td>
                  <td>
                    <template>
                      <!-- <b-button size="sm" class="btn btn-info" @click="ver(user.id)">
                        Detalles
                      </b-button> -->
                      <router-link class="btn btn-warning" :to="'/editUser/' + user.id">Actualizar</router-link>
                      <!-- <b-button variant="dark" class="btn btn-warning" :to="'/editUser/' + user.id">Actualizar</b-button> -->
                      <b-button size="sm" class="btn btn-danger" @click="eliminar(user.id)">
                        Eliminar
                      </b-button>
                    </template>
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

export default {
  methods: {
    loadUsers () {
      HTTP.get('user/viewUsers').then(r => {
        this.users = r.data
        console.log(this.users)
      })
    },
    async ver (userId) {
      HTTP.get('user/viewUser/' + userId).then(r => {
        this.user = r.data
      })
    },
    async eliminar (userId) {
      try {
        await HTTP.delete('user/deleteUser/' + userId)
        alert('Deleted Successfully')
        this.loadUsers()
      } catch (e) {
        console.log(e)
      }
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
      users: {}
    }
  },
  mounted () {
    HTTP.get('user/viewUsers').then(r => {
      this.users = r.data
      $('#tblUsers').DataTable({
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
