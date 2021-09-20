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
    <div>
      <div class="card pl-4 pt-5 pb-5 pr-4 mt-3">
        <b-container fluid>
          <!-- Main table element -->
          <div class="container-fluid">
          <table id="tblUsers" class="table table-hover table-striped table-bordered">
            <thead>
              <tr>
                  <th hidden>Id</th>
                  <th>#</th>
                  <th>Username</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Operaciones</th>
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
                      <router-link class="btn btn-warning" :to="'/editUser/' + user.id">Actualizar</router-link>
                      <b-button size="sm" class="btn btn-danger" @click="eliminar(user.id, user.username)">
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
    eliminar (userId, username) {
      this.$swal({
        title: '¡Advertencia!',
        text: '¿Eliminar a ' + username + '?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Si, eliminar',
        cancelButtonText: 'No, cancelar'
      }).then((result) => {
        if (result.value) {
          userService.deleteUser(userId).then((response) => {
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
      users: {}
    }
  },
  mounted: function () {
    // userService.getUsers().then((response) => {
    //   this.users = response.data
    //   $('#tblUsers').DataTable({
    //     responsive: true,
    //     scrollY: 540,
    //     ordering: true,
    //     select: true,
    //     'columnDefs': [
    //       {'className': 'dt-center', 'targets': '_all'}
    //     ],
    //     'language': {
    //       'url': '//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json'
    //     }
    //   })
    // })
    //   .catch((e) => {
    //     console.log(e)
    //   })
  }
}
</script>
