import bcrypt from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user.repository'
import { UserRepository } from '@/repositories/user.repository'
import { CreateOrganizationUseCase } from './sign-up.service'

let userRepository: UserRepository
let sut: CreateOrganizationUseCase

describe('@use-case/organization/create', async () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    sut = new CreateOrganizationUseCase({ userRepository })
  })

  it('should be able to create a new organization', async () => {
    const { user } = await sut.handle({
      name: 'test',
      email: 'test',
      cep: 'test',
      address: 'test',
      password: 'test',
      whatsapp: 'test',
    })

    expect(user).toEqual(
      expect.objectContaining({
        id: expect.any(String),
      }),
    )
  })

  it('should hash the password when persisting data', async () => {
    const password = '120392130'

    const { user } = await sut.handle({
      name: 'test',
      email: 'test',
      cep: 'test',
      address: 'test',
      password,
      whatsapp: 'test',
    })

    const saltRounds = 8

    const comparePassword = await bcrypt.compare(password, user.password_hash)

    expect(comparePassword).toEqual(true)
  })
})
