import axios from 'axios'

export const HTTP = axios.create({
  baseURL: `https://localhost:8090/token/`,
  headers: {
    'Content-Type': 'application/json'
  }
})
