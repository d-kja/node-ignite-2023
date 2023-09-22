import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user.repository'
import bcrypt from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { InvalidCredentialsError } from '../../errors/invalid-credentials-error'
import { AuthenticateUserUseCase } from './authenticate.service'

let userRepository: InMemoryUserRepository
let sut: AuthenticateUserUseCase

describe('@use-case/user/authenticate', async () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    sut = new AuthenticateUserUseCase(userRepository)
  })

  it('should be able to authenticate a user', async () => {
    const password = '123321'
    const email = 'johndoe@example.com'

    const saltRounds = 6
    const passwordHash = await bcrypt.hash(password, saltRounds)

    await userRepository.create({
      name: 'john doe',
      email,
      password_hash: passwordHash,
    })

    const { user } = await sut.handle({
      email,
      password,
    })

    expect(user).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
        email: expect.any(String),
        password_hash: expect.any(String),
      }),
    )
  })

  it("shouldn't be able to authenticate if user doesn't exist", async () => {
    await expect(() =>
      sut.handle({
        email: 'notjohndoe@example.com',
        password: '321123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it("shouldn't be able to authenticate if password doesn't match", async () => {
    const email = 'johndoe@example.com'

    await userRepository.create({
      name: 'john doe',
      email,
      password_hash: '123321',
    })

    await expect(() =>
      sut.handle({
        email,
        password: '321123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
