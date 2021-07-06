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
          <!-- User Interface controls -->
          <b-row>
            <b-col lg="6" class="my-1">
              <b-form-group
                label="Clasificar"
                label-for="sort-by-select"
                label-cols-sm="3"
                label-align-sm="left"
                label-size="sm"
                class="mb-0"
                v-slot="{ ariaDescribedby }"
              >
                <b-input-group size="sm">
                  <b-form-select
                    id="sort-by-select"
                    v-model="sortBy"
                    :options="sortOptions"
                    :aria-describedby="ariaDescribedby"
                    class="w-75"
                  >
                    <template #first>
                      <option value="">-- ninguno --</option>
                    </template>
                  </b-form-select>

                  <b-form-select
                    v-model="sortDesc"
                    :disabled="!sortBy"
                    :aria-describedby="ariaDescribedby"
                    size="sm"
                    class="w-25"
                  >
                    <option :value="false">Ascendente</option>
                    <option :value="true">Descendente</option>
                  </b-form-select>
                </b-input-group>
              </b-form-group>
            </b-col>

            <b-col lg="6" class="my-1">
              <b-form-group
                label="Orden"
                label-for="initial-sort-select"
                label-cols-sm="3"
                label-align-sm="left"
                label-size="sm"
                class="mb-0"
              >
                <b-form-select
                  id="initial-sort-select"
                  v-model="sortDirection"
                  :options="['ascendente', 'descendente', 'ultimo']"
                  size="sm"
                ></b-form-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="6" class="my-1">
              <b-form-group
                label="Buscar"
                label-for="per-page-select"
                label-cols-sm="8"
                label-cols-md="12"
                label-cols-lg="3"
                label-align-sm="left"
                label-size="sm"
                class="mb-0"
              >
                <b-input-group size="sm">
                  <b-form-input
                    id="filter-input"
                    v-model="filter"
                    type="search"
                    placeholder="Escribe algo"
                  ></b-form-input>

                  <b-input-group-append>
                    <b-button :disabled="!filter" @click="filter = ''"
                      >Limpiar</b-button
                    >
                  </b-input-group-append>
                </b-input-group>
              </b-form-group>
            </b-col>

            <b-col sm="6" md="6" class="my-1">
              <b-form-group
                label="Mostrar cada"
                label-for="per-page-select"
                label-cols-sm="6"
                label-cols-md="12"
                label-cols-lg="3"
                label-align-sm="left"
                label-size="sm"
                class="mb-0"
              >
                <b-form-select
                  id="per-page-select"
                  v-model="perPage"
                  :options="pageOptions"
                  size="sm"
                ></b-form-select>
              </b-form-group>
            </b-col>

          </b-row>

          <!-- Main table element -->
          <div class="container-fluid">
          <b-table
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
              <!-- <b-button
                size="sm"
                @click="info(row.item, row.index, $event.target)"
                class="mr-1"
              >
                Info modal
              </b-button> -->
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
          </b-table>
          </div>

          <b-row>
            <b-col sm="7" md="6" class="my-1">
              <b-pagination
                v-model="currentPage"
                :total-rows="totalRows"
                :per-page="perPage"
                align="fill"
                size="sm"
                class="my-0"
              ></b-pagination>
            </b-col>
          </b-row>

          <!-- Info modal -->
          <b-modal
            :id="infoModal.id"
            :title="infoModal.title"
            ok-only
            @hide="resetInfoModal"
          >
            <pre>{{ infoModal.content }}</pre>
          </b-modal>
        </b-container>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      items: [
        {
          isActive: true,
          age: 40,
          name: { first: 'Dickerson', last: 'Macdonald' }
        },
        { isActive: false, age: 21, name: { first: 'Larsen', last: 'Shaw' } },
        {
          isActive: false,
          age: 9,
          name: { first: 'Mini', last: 'Navarro' },
          _rowVariant: 'success'
        },
        { isActive: false, age: 89, name: { first: 'Geneva', last: 'Wilson' } },
        { isActive: true, age: 38, name: { first: 'Jami', last: 'Carney' } },
        { isActive: false, age: 27, name: { first: 'Essie', last: 'Dunlap' } },
        { isActive: true, age: 40, name: { first: 'Thor', last: 'Macdonald' } },
        {
          isActive: true,
          age: 87,
          name: { first: 'Larsen', last: 'Shaw' },
          _cellVariants: { age: 'danger', isActive: 'warning' }
        },
        { isActive: false, age: 26, name: { first: 'Mitzi', last: 'Navarro' } },
        {
          isActive: false,
          age: 22,
          name: { first: 'Genevieve', last: 'Wilson' }
        },
        { isActive: true, age: 38, name: { first: 'John', last: 'Carney' } },
        { isActive: false, age: 29, name: { first: 'Dick', last: 'Dunlap' } }
      ],
      fields: [
        {
          key: 'name',
          label: 'Nombre completo',
          sortable: true,
          sortDirection: 'desc'
        },
        {
          key: 'isActive',
          label: 'Activo',
          formatter: (value, key, item) => {
            return value ? 'Yes' : 'No'
          },
          sortable: true,
          sortByFormatted: true,
          filterByFormatted: true
        },
        { key: 'actions', label: 'Acciones' }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, { value: 100, text: 'Ver todo' }],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      infoModal: {
        id: 'info-modal',
        title: '',
        content: ''
      }
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
    // Set the initial number of items
    this.totalRows = this.items.length
  },
  methods: {
    info (item, index, button) {
      this.infoModal.title = `Row index: ${index}`
      this.infoModal.content = JSON.stringify(item, null, 2)
      this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },
    resetInfoModal () {
      this.infoModal.title = ''
      this.infoModal.content = ''
    },
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    }
  }
}
</script>
