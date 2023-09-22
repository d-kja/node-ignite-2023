import bcrypt from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user.repository'
import { UserAlreadyExistsError } from '../../errors/user-already-exists.error'
import { RegisterUserUseCase } from './register.service'

let sut: RegisterUserUseCase

describe('@use-cases/user/register', () => {
  beforeEach(() => {
    sut = new RegisterUserUseCase(new InMemoryUserRepository())
  })

  it('should be able to create a new user', async () => {
    const { id } = await sut.handle({
      name: 'john doe',
      email: 'johndoe@example.com',
      password: '123321',
    })

    expect(id).toEqual(expect.any(String))
  })

  it('should hash the password properly when creating a new user', async () => {
    const password = '123321'

    const user = await sut.handle({
      name: 'john doe',
      email: 'johndoe@example.com',
      password,
    })

    const isPasswordHashedCorrectly = await bcrypt.compare(
      password,
      user.password_hash,
    )

    expect(isPasswordHashedCorrectly).toBe(true)
  })

  it("shouldn't be able to create a new user with an existing email", async () => {
    const email = 'johndoe@example.com'

    await sut.handle({
      name: 'john doe',
      email,
      password: '123321',
    })

    await expect(
      sut.handle({
        name: 'john doe',
        email,
        password: '123321',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
