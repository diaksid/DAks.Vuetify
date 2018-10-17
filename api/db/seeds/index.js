const config = require('config')
const seedUsers = require('./seed_users.js')

process.env.NODE_ENV = process.env.NODE_ENV || config.util.initParam('NODE_ENV', 'development')

seedUsers()
  .then(() => process.exit())
