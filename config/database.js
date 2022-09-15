const knex = require('knex')
const environments = require('../knexfile')

const currentEnv = process.env.NODE_ENV
const db = knex(environments[currentEnv])

module.exports = db