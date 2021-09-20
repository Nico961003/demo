<template lang='html'>
  <section class='dashboard'>
    <!-- Page Title Header Starts-->
    <div class="proBanner">
    </div>
    <div class='row'>
    </div>
    <div class='row'>
      <div class='col-md-4 grid-margin stretch-card'>
        <div class='card'>
        </div>
      </div>
      <div class='col-md-4 grid-margin stretch-card'>
        <div class='card'>
        </div>
      </div>
      <div class='col-md-4 grid-margin stretch-card'>
        <div class='card'>
          <button class="btn btn-success" style="">Clients Module</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang='js'>
import JQuery from 'jquery'
import auth from './main/user-pages/auth'
let $ = JQuery
export default {
  name: 'dashboard',
  components: {
  },
  computed: {
    userToken () {
      return auth.getUserToken()
    }
  },
  methods: {
    toggleProBanner: function () {
      $('body').toggleClass('pro-banner-collapse')
    }
  }
}
</script>

<style scoped lang='scss'>
</style>

<style lan="css">
  .btn {
    border:0px;
    width:423px;
    height:190px;
  }
</style>
