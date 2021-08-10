<template lang="html">
  <section class="app-sidebar">
    <nav class="sidebar sidebar-offcanvas" id="sidebar">
      <ul class="nav">
        <li class="nav-item nav-profile">
          <a href="/#/myProfile" class="nav-link">
            <div class="profile-image">
              <img class="img-xs rounded-circle" src="../../assets/images/noavatar.svg" alt="profile image">
              <div class="dot-indicator bg-success"></div>
            </div>
            <div class="text-wrapper">
              <!-- <p class="profile-name">Usuario</p> -->
              <p class="profile-name" v-if="userLogged">{{userLogged}}</p>
              <p class="designation" v-if="tokenDecode">{{tokenDecode.realm_access.roles[2]}}</p>
              <!-- <p class="designation">Tipo de usuario</p> -->
            </div>
          </a>
        </li>
        <li class="nav-item nav-category">Menú Principal</li>
        <li class="nav-item">
          <a class="nav-link" v-b-toggle="'ui-user'">
            <i class="menu-icon typcn typcn-user-outline"></i>
            <span class="menu-title">Usuarios</span>
            <i class="menu-arrow"></i>
          </a>
          <b-collapse id="ui-user">
            <ul class="nav flex-column sub-menu">
              <li class="nav-item">
                <router-link class="nav-link" to="/readUsers">Mis usuarios</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/addUser">Agregar</router-link>
              </li>
            </ul>
          </b-collapse>
        </li>
        <li class="nav-item">
          <a class="nav-link" v-b-toggle="'ui-role'">
            <i class="menu-icon typcn typcn-document-text"></i>
            <span class="menu-title">Roles</span>
            <i class="menu-arrow"></i>
          </a>
          <b-collapse id="ui-role">
            <ul class="nav flex-column sub-menu">
              <li class="nav-item">
                <router-link class="nav-link" to="/readRoles">Mis Roles</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/addRole">Agregar</router-link>
              </li>
            </ul>
          </b-collapse>
        </li>
        <li class="nav-item">
          <a class="nav-link" v-b-toggle="'ui-client'">
            <i class="menu-icon typcn typcn-group-outline"></i>
            <span class="menu-title">Clientes</span>
            <i class="menu-arrow"></i>
          </a>
          <b-collapse id="ui-client">
            <ul class="nav flex-column sub-menu">
              <li class="nav-item">
                <router-link class="nav-link" to="/readClients">Mis Clientes</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/addClient">Agregar</router-link>
              </li>
            </ul>
          </b-collapse>
        </li>
        <!-- <li class="nav-item">
          <a class="nav-link" v-b-toggle="'ui-group'">
            <i class="menu-icon typcn typcn-group-outline"></i>
            <span class="menu-title">Grupos</span>
            <i class="menu-arrow"></i>
          </a>
          <b-collapse id="ui-group">
            <ul class="nav flex-column sub-menu">
              <li class="nav-item">
                <router-link class="nav-link" to="/readGroups">Mis Grupos</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/addGroup">Agregar</router-link>
              </li>
            </ul>
          </b-collapse>
        </li> -->
        <!-- <li class="nav-item">
          <a class="nav-link" href="https://google.com.mx">
            <i class="menu-icon typcn typcn-document-add"></i>
            <span class="menu-title">Pendiente</span>
          </a>
        </li> -->
      </ul>
    </nav>
  </section>
</template>

<script lang="js">
import JQuery from 'jquery'
import auth from '../../views/main/user-pages/auth'
import decodedToken from '../../logic/decodeToken'
// eslint-disable-next-line
let $ = JQuery
export default {
  name: 'app-sidebar',
  computed: {
    userLogged () {
      return auth.getUserLogged()
    },
    tokenDecode () {
      return decodedToken.getTokenDecode()
    }
  },
  mounted () {
    const body = document.querySelector('body')
    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    document.querySelectorAll('.sidebar .nav-item').forEach(function (el) {
      el.addEventListener('mouseover', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open')
        }
      })
      el.addEventListener('mouseout', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open')
        }
      })
    })
  }
}
</script>

<style scoped lang="scss">
.app-sidebar {
}
</style>
