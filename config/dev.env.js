'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ENV: '"http://localhost:8090/"',
  TOKEN_ENV: '"http://localhost:8090/token/"',
  REALM_ENV: '"DEV"'
})
