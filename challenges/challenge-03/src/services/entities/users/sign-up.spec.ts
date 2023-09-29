import bcrypt from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user.repository'
import { UserRepository } from '@/repositories/user.repository'
import { UserAlreadyExistsError } from '@/services/errors/user-already-exists'
import { CreateUserUseCase } from './sign-up.service'

let userRepository: UserRepository
let sut: CreateUserUseCase

describe('@use-case/user/create', async () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    sut = new CreateUserUseCase({ userRepository })
  })

  it('should be able to create a new user', async () => {
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

    const comparePassword = await bcrypt.compare(password, user.password_hash)

    expect(comparePassword).toEqual(true)
  })

  it("shouldn't be able to create a user with repeated email", async () => {
    const email = 'johndoe@example.com'
    await sut.handle({
      name: 'test',
      email,
      cep: 'test',
      address: 'test',
      password: 'test',
      whatsapp: 'test',
    })

    await expect(() =>
      sut.handle({
        name: 'test',
        email,
        cep: 'test',
        address: 'test',
        password: 'test',
        whatsapp: 'test',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
