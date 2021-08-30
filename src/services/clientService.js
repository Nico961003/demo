import { HTTP } from '../logic/http-common'
import decodedToken from '../logic/decodeToken'
export default {

  getClientByToken () {
    var roleId = decodedToken.getTokenDecode()
    return HTTP.get('client/viewClient/' + roleId.azp)
  },
  getClientById (id) {
    return HTTP.get('role/rolesC/' + id)
  }

  // createRole (data) {
  //   return HTTP.post('Role/createRole', data)
  // },

  // deleteRole (RoleId) {
  //   return HTTP.delete('Role/deleteRole/' + RoleId)
  // }

}
