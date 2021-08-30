import { HTTP } from '../logic/http-common'
export default {
  // myVar = 1;
  getUsers () {
    return HTTP.get('user/viewUsers')
  },

  getUserById (userId) {
    return userId
  },

  createUser (data) {
    return HTTP.post('user/createUser', data)
  },

  updateUser (data) {
    return HTTP.put('user/updateUser/' + this.$route.params.id + data)
  },

  deleteUser (userId) {
    return HTTP.delete('user/deleteUser/' + userId)
  }

}
