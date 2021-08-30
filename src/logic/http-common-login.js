import axios from 'axios'

export const HTTP = axios.create({
  baseURL: process.env.TOKEN_ENV,
  headers: {
    'Content-Type': 'application/json'
  }
})
