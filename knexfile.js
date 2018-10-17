const options = env => {
  return {
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'schema_migrations',
      directory: './api/db/migrations'
    },
    seeds: {
      directory: `./api/db/seeds/${env}`
    }
  }
}

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host: '127.0.0.1',
      database: 'daks',
      user: 'master',
      password: '+1234567'
    },
    ...options('development')
  },
  production: {
    client: 'postgresql',
    connection: {
      host: '127.0.0.1',
      database: 'daks',
      user: 'master',
      password: '+1234567'
    },
    ...options('production')
  }
}
