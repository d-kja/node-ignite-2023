import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('user', async (table) => {
    table.uuid('id').defaultTo(knex.fn.uuid()).primary()
    table.uuid('session_id').index()

    table.text('name').notNullable()
    table.text('profile_picture_url')
    table.text('bio')

    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users')
}
