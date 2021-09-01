'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ENV: '"http://127.0.0.1:8090/"',
  TOKEN_ENV: '"http://127.0.0.1:8090/token/"',
  REALM_ENV: '"qsstorage"'
})
