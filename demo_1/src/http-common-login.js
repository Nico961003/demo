// import axios from 'axios'

// var data = {
//   'client_id': 'login',
//   'username': 'user1',
//   'password': 'user1',
//   'grant_type': 'password'
// }

// export const HTTP = axios.create({
//   baseURL: `http://localhost:8090/token/`,
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/x-www-form-urlencoded'
//   },
//   data: data
// })

import axios from 'axios'

export const HTTP = axios.create({
  baseURL: `http://localhost:8090/token/`,
  headers: {
    'Content-Type': 'application/json'
  }
})
