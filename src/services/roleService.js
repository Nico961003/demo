import { HTTP } from '../logic/http-common'
import clientService from './clientService'
export default {

  getRoles (clientId) {
    return HTTP.get('role/rolesC/' + clientId)
  },
  async getRoleById (userId) {
    await clientService.getClientByToken().then((response) => {
      this.clientId = response.data.id
    })
    // console.log('user/viewUser/' + userId + '/' + localStorage.getItem('clientName'))
    return HTTP.get('user/viewUser/' + userId + '/' + localStorage.getItem('clientName'))
  }

}
