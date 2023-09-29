import { randomUUID } from 'node:crypto'

import { CreateUser, User } from '@/@types/repository/entities'
import { UserRepository } from '../user.repository'

export class InMemoryUserRepository implements UserRepository {
  private repository: User[] = []

  async create(data: CreateUser): Promise<User> {
    const organization = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      address: data.address,
      cep: data.cep,
      password_hash: data.password_hash,
      whatsapp: data.whatsapp,
      role: data.role ?? 'MEMBER',
      created_at: new Date(),
    } satisfies User

    this.repository.push(organization)

    return organization
  }
  async update(data: Partial<User> & { id: string }): Promise<User> {
    const userIndex = this.repository.findIndex((item) => item.id === data.id)

    if (userIndex < 0) {
      throw new Error('Organization not found')
    }

    const organization = this.repository[userIndex]

    this.repository[userIndex] = {
      ...organization,
      ...data,
    }

    return this.repository[userIndex]
  }
  async findById(data: string): Promise<User | null> {
    const organization = this.repository.find((item) => item.id === data)

    if (!organization) return null
    return organization
  }
  async findByEmail(data: string): Promise<User | null> {
    const organization = this.repository.find((item) => item.email === data)

    if (!organization) return null
    return organization
  }
}
