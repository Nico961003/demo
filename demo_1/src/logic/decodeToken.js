import VueJwtDecode from 'vue-jwt-decode'
import Cookies from 'js-cookie'

// var token = Cookies.get('userToken')
// var prueba = VueJwtDecode.decode(token)
// console.log(prueba)

export default {
  getTokenDecode () {
    var token = Cookies.get('userToken')
    var prueba = VueJwtDecode.decode(token)
    return prueba
  }
}
