import type { Prisma, User } from '@prisma/client'
import { UserRepository } from '../user.repository'

import { randomUUID } from 'node:crypto'

export class InMemoryUserRepository implements UserRepository {
  public users: User[] = []

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      created_at: new Date(),
      updated_at: new Date(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
    }

    this.users.push(user)

    return { user }
  }

  async findByEmail(email: string) {
    const user = this.users.find((user) => user.email === email)

    if (!user) return null
    return user
  }

  async findById(id: string) {
    const user = this.users.find((user) => user.id === id)

    if (!user) return null
    return user
  }
}
