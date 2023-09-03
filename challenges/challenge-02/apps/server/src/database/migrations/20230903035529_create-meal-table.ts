import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('meal', async (table) => {
    table.uuid('id').defaultTo(knex.fn.uuid()).primary()
    table.uuid('session_id').index()

    table.text('name').notNullable()
    table.text('description')
    table.boolean('is_part_of_diet').defaultTo(false)
    table.timestamp('time_stamp').notNullable()

    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('meal')
}
