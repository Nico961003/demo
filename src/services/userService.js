import { HTTP } from '../logic/http-common'
export default {

  getUsers () {
    return HTTP.get('user/viewUsers')
  },

  getUserByUsername (username) {
    return HTTP.get('user/viewUserName/' + username)
  },

  getUserByEmail (email) {
    return HTTP.get('user/viewUserEmail/' + email)
  },

  getUserById (userId) {
    return HTTP.get('user/viewUser/' + userId)
  },

  createUser (data) {
    return HTTP.post('user/createUser', data)
  },

  updateUser (data) {
    return HTTP.put('user/updateUser/' + this.$route.params.id + data)
  },

  deleteUser (userId) {
    return HTTP.delete('user/deleteUser/' + userId)
  },

  restoreUserPassword (email) {
    return HTTP.get('user/sendRestoreEmail/' + email)
  }

}
