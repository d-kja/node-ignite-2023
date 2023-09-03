import type { Knex } from 'knex'
import { env } from './env'

const knexConfig: Knex.Config = {
  client: env.DATABASE_CLIENT,
  connection: env.DATABASE_URL,
  searchPath: ['knex', 'public'],

  migrations: {
    extension: 'ts',
    directory: './src/database/migrations',
  },
}

export default knexConfig
