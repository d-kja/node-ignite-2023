import knex, { Knex } from 'knex'
import { env } from '../env'

export const config: Knex.Config = {
  client: 'pg',
  connection: env.DATABASE_URL,
  searchPath: ['knex', 'public'],

  migrations: {
    extension: 'ts',
    directory: './src/database/migrations',
  },
}

/**
 * @Info
 *
 * Knex database connection, use this to manipulate the data in your database
 *
 * ---
 *
 * @Examples
 *
 * 01. Listing data
 *
 * ```ts
 * const transactions = await db('transactions')
 *   .select('*')
 *   .where('amount', 2000)
 * ```
 *
 * ---
 *
 * 02. Creating data row
 * ```ts
 * const transactions = await db('transactions')
 *   .insert({
 *     id: randomUUID(),
 *     title: 'Transaction test',
 *     amount: 2000,
 *   })
 *   .returning('*') // Sql doesn't return the values after inserting by default
 * ```
 */
export const db = knex(config)
