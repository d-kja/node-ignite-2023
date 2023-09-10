import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('session', async (table) => {
    table.uuid('session_id').primary()
    table.uuid('user_id').index().notNullable()

    table.text('refresh_token').index().notNullable()
    table.text('created_at').defaultTo(knex.fn.now())
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('session')
}
