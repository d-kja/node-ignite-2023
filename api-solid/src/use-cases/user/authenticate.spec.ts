import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user.repository'
import bcrypt from 'bcryptjs'
import { describe, expect, it } from 'vitest'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'
import { AuthenticateUserUseCase } from './authenticate.service'

describe('@use-case/user/authenticate', async () => {
  it('should be able to authenticate a user', async () => {
    const userRepository = new InMemoryUserRepository()
    const sut = new AuthenticateUserUseCase(userRepository)

    const password = '123321'
    const email = 'johndoe@example.com'

    const saltRounds = 6
    const passwordHash = await bcrypt.hash(password, saltRounds)

    await userRepository.create({
      name: 'john doe',
      email,
      password_hash: passwordHash,
    })

    const { user } = await sut.execute({
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
    const userRepository = new InMemoryUserRepository()
    const sut = new AuthenticateUserUseCase(userRepository)

    await expect(() =>
      sut.execute({
        email: 'notjohndoe@example.com',
        password: '321123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it("shouldn't be able to authenticate if password doesn't match", async () => {
    const userRepository = new InMemoryUserRepository()
    const sut = new AuthenticateUserUseCase(userRepository)

    const email = 'johndoe@example.com'

    await userRepository.create({
      name: 'john doe',
      email,
      password_hash: '123321',
    })

    await expect(() =>
      sut.execute({
        email,
        password: '321123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
