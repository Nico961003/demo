import { HTTP } from '../logic/http-common'
import clientService from './clientService'
export default {

  getRoles () {
    clientService.getClientByToken().then((response) => {
      return HTTP.get('role/rolesC/' + response.data.id)
    })
      .catch((e) => {
        console.log(e)
      })
  }

}
