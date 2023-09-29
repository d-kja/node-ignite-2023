import bcrypt from 'bcryptjs'

import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user.repository'
import { UserRepository } from '@/repositories/user.repository'
import { InvalidCredentialsError } from '@/services/errors/invalid-credentials'
import { beforeEach, describe, expect, it } from 'vitest'
import { SignUpOrganizationUseCase } from './sign-in.service'

let userRepository: UserRepository
let sut: SignUpOrganizationUseCase

describe('@use-case/organization/sign-up', async () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    sut = new SignUpOrganizationUseCase({ userRepository })
  })

  it('should be able to sign in with organization credentials', async () => {
    const password = '123321'
    const email = 'johndoe@example.com'

    const saltRounds = 8

    const password_hash = await bcrypt.hash(password, saltRounds)

    await userRepository.create({
      name: 'sign-in',
      email,
      password_hash,
      cep: 'test',
      address: 'test',
      whatsapp: 'test',
    })

    const { user } = await sut.handle({
      email,
      password,
    })

    expect(user).toEqual(
      expect.objectContaining({
        email,
        password_hash,
      }),
    )
  })

  it("shouldn't be able to login with invalid email", async () => {
    const password = '123321'
    const email = 'johndoe@example.com'

    const saltRounds = 8

    const password_hash = await bcrypt.hash(password, saltRounds)

    await userRepository.create({
      name: 'sign-in',
      email,
      password_hash,
      cep: 'test',
      address: 'test',
      whatsapp: 'test',
    })

    await expect(() =>
      sut.handle({
        email: 'fake@example.com',
        password,
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it("shouldn't be able to login with invalid password", async () => {
    const password = '123321'
    const email = 'johndoe@example.com'

    const saltRounds = 8

    const password_hash = await bcrypt.hash('098098', saltRounds)

    await userRepository.create({
      name: 'sign-in',
      email,
      password_hash,
      cep: 'test',
      address: 'test',
      whatsapp: 'test',
    })

    await expect(() =>
      sut.handle({
        email,
        password,
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
