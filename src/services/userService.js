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

  deleteUser (userId) {
    return HTTP.delete('user/deleteUser/' + userId)
  }

}
