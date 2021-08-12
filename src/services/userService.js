import { HTTP } from '../logic/http-common'
export default {
  // myVar = 1;
  getUsers () {
    return HTTP.get('user/viewUsers')
  }
}
