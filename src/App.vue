<template lang="html">
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="js">
import decodedToken from './logic/decodeToken'

export default {
  mounted: function () {
    this.loadPage()
  },
  methods: {
    loadPage () {
      var checkSession = decodedToken.getTokenDecode()
      if (checkSession === null) {
        this.$router.push('/')
      }
    }
  }
}
</script>

<style>
@import "../node_modules/mdi/css/materialdesignicons.min.css";
@import "../node_modules/flag-icon-css/css/flag-icon.min.css";
@import "../node_modules/vue-snotify/styles/material.css";
@import "../node_modules/typicons.font/src/font/typicons.css";
</style>

<style lang="scss">
@import "assets/scss/shared/style";
</style>
