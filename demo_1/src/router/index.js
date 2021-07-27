import Vue from 'vue'
import Router from 'vue-router'

// Dashboard Components
import dashboard from '../views/dashboard'
//  Widgets Components
import mainView from '../mainView'
import buttons from '../views/basic-elements/buttons'
import dropdowns from '../views/basic-elements/dropdowns'
import typography from '../views/basic-elements/typography'
//  Icons Components
import mdiIcons from '../views/icons/mdi-icons'
import login from '../views/main/user-pages/login'
import register from '../views/main/user-pages/register'
//  Table Components
import basicTables from '../views/tables/basic-table'
// User components
import addUser from '../views/user/add-User'
import readUsers from '../views/user/read-Users'
import editUser from '../views/user/edit-User'
// Role components
import addRole from '../views/role/add-Role'
import readRoles from '../views/role/read-Roles'
import editRole from '../views/role/edit-Role'
// Client components
import addClient from '../views/k_clients/add-Client'
import readClients from '../views/k_clients/read-Clients'
import editClient from '../views/k_clients/edit-Client'
// Group components
import addGroup from '../views/group/add-Group'
import readGroups from '../views/group/read-Groups'
import editGroup from '../views/group/edit-group'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  mode: 'hash',
  routes: [{
    path: '/',
    redirect: '/login',
    component: login,
    children: [
      {
        path: '/login',
        name: 'login',
        component: login
      }
    ]
  },
  {
    path: '/*',
    redirect: '/dashboard',
    component: mainView,
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: dashboard
      },
      {
        path: '/buttons',
        name: 'buttons',
        component: buttons
      },
      {
        path: '/dropdowns',
        component: dropdowns
      },
      {
        path: '/typography',
        component: typography
      },
      {
        path: '/mdiIcons',
        component: mdiIcons
      },
      {
        path: '/basic_table',
        name: 'basicTables',
        component: basicTables
      },
      {
        path: '/adduser',
        name: 'addUser',
        component: addUser
      },
      {
        path: '/readusers',
        name: 'readUsers',
        component: readUsers
      },
      {
        path: '/edituser/:id',
        name: 'editUser',
        component: editUser
      },
      {
        path: '/readRoles',
        name: 'readRoles',
        component: readRoles
      },
      {
        path: '/addRole',
        name: 'addRole',
        component: addRole
      },
      {
        path: '/editrole/:id',
        name: 'editRole',
        component: editRole
      },
      {
        path: '/readClients',
        name: 'readClients',
        component: readClients
      },
      {
        path: '/addClient',
        name: 'addClient',
        component: addClient
      },
      {
        path: '/editClient/:id',
        name: 'editClient',
        component: editClient
      },
      {
        path: '/readGroups',
        name: 'readGroups',
        component: readGroups
      },
      {
        path: '/addGroup',
        name: 'addGroup',
        component: addGroup
      },
      {
        path: '/editGroup/:id',
        name: 'editGroup',
        component: editGroup
      }
    ]
  },
  {
    path: '*',
    redirect: '/pages/error_404',
    component: {
      render (c) { return c('router-view') }
    },
    children: [
      {
        path: '/pages/login',
        component: login
      },
      {
        path: '/pages/register',
        component: register
      }
    ]}
  ]
})
