<template>
  <section class="dashboard">
    <!-- Page Title Header Starts-->
    <!-- <div class="proBanner"></div> -->
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
            <thead class="thead-dark">
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
                      <b-button size="sm" class="btn btn-warning" @click="row.toggleDetails">
                        Actualizar
                      </b-button>
                      <b-button size="sm" class="btn btn-danger">
                        Eliminar
                      </b-button>
                    </template>
                  </td>
              </tr>
            </tbody>
          </table>
          <!-- <b-table
            :items="items"
            :fields="fields"
            :current-page="currentPage"
            :per-page="perPage"
            :filter="filter"
            :filter-included-fields="filterOn"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            :sort-direction="sortDirection"
            stacked="md"
            show-empty
            small
            @filtered="onFiltered"
          >
            <template #cell(name)="row">
              {{ row.value.first }} {{ row.value.last }}
            </template>

            <template #cell(actions)="row">
              <b-button size="sm" @click="row.toggleDetails">
                {{ row.detailsShowing ? "Cerrar" : "Ver" }} Detalles
              </b-button>
              <b-button size="sm" class="btn btn-warning" @click="row.toggleDetails">
                Actualizar
              </b-button>
              <b-button size="sm" class="btn btn-danger" @click="row.toggleDetails">
                Eliminar
              </b-button>
            </template>

            <template #row-details="row">
              <b-card>
                <ul>
                  <li v-for="(value, key) in row.item" :key="key">
                    {{ key }}: {{ value }}
                  </li>
                </ul>
              </b-card>
            </template>
          </b-table> -->
          </div>

          <b-row>
            <!-- <b-col sm="7" md="6" class="my-1">
              <b-pagination
                v-model="currentPage"
                :total-rows="totalRows"
                :per-page="perPage"
                align="fill"
                size="sm"
                class="my-0"
              ></b-pagination>
            </b-col> -->
          </b-row>

          <!-- Info modal -->
          <!-- <b-modal
            :id="infoModal.id"
            :title="infoModal.title"
            ok-only
            @hide="resetInfoModal"
          >
            <pre>{{ infoModal.content }}</pre>
          </b-modal> -->
        </b-container>
      </div>
    </div>
  </section>
</template>

<script>
import { HTTP } from '../../http-common'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
import 'datatables.net-dt/js/dataTables.dataTables'
import 'datatables.net-dt/css/jquery.dataTables.min.css'
import $ from 'jquery'

export default {
  methods: {
    loadUsers () {
      HTTP.get('user/viewUsers').then(r => {
        this.users = r.data
        // console.log(this.users)
      })
    }
    // info (item, index, button) {
    //   this.infoModal.title = `Row index: ${index}`
    //   this.infoModal.content = JSON.stringify(item, null, 2)
    //   this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    // },
    // resetInfoModal () {
    //   this.infoModal.title = ''
    //   this.infoModal.content = ''
    // },
    // onFiltered (filteredItems) {
    //   // Trigger pagination to update the number of buttons/pages due to filtering
    //   this.totalRows = filteredItems.length
    //   this.currentPage = 1
    // }
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
      // items: [
      //   { isActive: false, age: 89, name: { first: 'Geneva', last: 'Wilson' } },
      //   {
      //     isActive: true,
      //     age: 87,
      //     name: { first: 'Larsen', last: 'Shaw' },
      //     _cellVariants: { age: 'danger', isActive: 'warning' }
      //   }
      // ],
      // fields: [
      //   {
      //     key: 'name',
      //     label: 'Nombre completo',
      //     sortable: true,
      //     sortDirection: 'desc'
      //   },
      //   {
      //     key: 'isActive',
      //     label: 'Activo',
      //     formatter: (value, key, item) => {
      //       return value ? 'Yes' : 'No'
      //     },
      //     sortable: true,
      //     sortByFormatted: true,
      //     filterByFormatted: true
      //   },
      //   { key: 'actions', label: 'Acciones' }
      // ],
      // totalRows: 1,
      // currentPage: 1,
      // perPage: 5,
      // pageOptions: [5, 10, 15, { value: 100, text: 'Ver todo' }],
      // sortBy: '',
      // sortDesc: false,
      // sortDirection: 'asc',
      // filter: null,
      // filterOn: [],
      // infoModal: {
      //   id: 'info-modal',
      //   title: '',
      //   content: ''
      // }
    }
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
  },
  mounted () {
    HTTP.get('user/viewUsers').then(r => {
      this.users = r.data
      // console.log(this.users)
      // console.log('Component mounted.')
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
    // Set the initial number of items
    // this.totalRows = this.items.length
  }
}
</script>
