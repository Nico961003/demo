// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueFormGenerator from 'vue-form-generator'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import JQuery from 'jquery'
import VueSlideBar from 'vue-slide-bar'
import VueSweetalert2 from 'vue-sweetalert2'
import VueGoodWizard from 'vue-good-wizard'
import 'sweetalert2/dist/sweetalert2.min.css'
// Import vue table 2
import { ClientTable } from 'vue-tables-2'

Vue.use(VueSweetalert2)
// eslint-disable-next-line
let $ = JQuery

Vue.use(VueFormGenerator, {
  validators: {
    strongPassword: (value, field, model) => {
      let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{5,}$/

      if (!regex.test(value)) {
        return [ 'Password should be a minimum five characters, at least one uppercase letter, ' +
        'one lowercase letter and one number']
      } else {
        return []
      }
    }
  }
})

Vue.config.productionTip = false

const options = {
  confirmButtonColor: '#41b882',
  cancelButtonColor: '#ff7674'
}

Vue.use(BootstrapVue)
Vue.use(VueSweetalert2, options)
Vue.use(VueGoodWizard)
Vue.use(ClientTable)
Vue.component('vue-slide-bar', VueSlideBar)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
