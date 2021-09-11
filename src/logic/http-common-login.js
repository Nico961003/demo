import axios from 'axios'

export const HTTP = axios.create({
  baseURL: process.env.TOKEN_ENV,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Max-Age': 86400
  }
})
