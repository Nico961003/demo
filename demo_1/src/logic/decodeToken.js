import VueJwtDecode from 'vue-jwt-decode'
import Cookies from 'js-cookie'

export default {
  getTokenDecode () {
    var token = Cookies.get('userToken')
    var decodeToken = VueJwtDecode.decode(token)
    return decodeToken
  }
}
