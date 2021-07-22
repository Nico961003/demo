// import axios from 'axios';
import Cookies from 'js-cookie'

// const ENDPOINT_PATH = 'https://reqres.in/api/';

export default {
  setUserLogged (userLogged) {
    Cookies.set('userLogged', userLogged)
  },
  getUserLogged () {
    return Cookies.get('userLogged')
  },
  setUserToken (userToken) {
    Cookies.set('userToken', userToken)
  },
  getUserToken () {
    return Cookies.get('userToken')
  }
  // ,
  // register(email, password) {
  //   const user = { email, password };
  //   return axios.post(ENDPOINT_PATH + 'regiser', user);
  // },
  // login(email, password) {
  //   const user = { email, password };
  //   return axios.post(ENDPOINT_PATH + 'login', user);
  // }
}
