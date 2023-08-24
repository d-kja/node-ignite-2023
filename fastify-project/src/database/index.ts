import dotenv from 'dotenv'
import knexSetup, { Knex } from 'knex'

dotenv.config()

export const config: Knex.Config = {
  client: 'pg',
  connection: process.env.DATABASE_URL,
  searchPath: ['knex', 'public'],

  migrations: {
    extension: 'ts',
    directory: './src/database/migrations',
  },
}

export const db = knexSetup(config)
