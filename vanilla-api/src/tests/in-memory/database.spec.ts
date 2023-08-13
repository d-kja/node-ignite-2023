import assert from 'node:assert'
import { randomUUID } from 'node:crypto'
import { beforeEach, describe, it } from 'node:test'
import { User } from '../../@types/in-memory/database'
import { database } from '../../in-memory/database'

const deepClone = (item: {}) => JSON.parse(JSON.stringify(item))
let usersClone: User[] = []

describe('@in-memory-database', () => {
  beforeEach(() => {
    usersClone = [...deepClone(database.get())]
  })

  it('should be able to insert new users', () => {
    const user: User = {
      id: randomUUID(),
      name: 'johndoe',
      email: 'johndoe@example.com',
    }

    usersClone.push(user)
    assert.strictEqual(usersClone.length, 1)
  })
})
