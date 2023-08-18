import assert from 'node:assert'
import { describe, it } from 'node:test'
import { Table } from '../../@types/in-memory/database.js'
import { Database } from '../../in-memory/database.js'

const database = new Database(false)

describe('@in-memory-database', () => {
  it('should be able to insert new users', () => {
    const user = {
      name: 'john',
      email: 'johndoe@test.com',
    }

    database.insert('users', user)
    const users = database.select('users') as Table

    assert.strictEqual(users.length, 1)

    const updatedUser = users[0]
    assert('id' in updatedUser)
  })
})
