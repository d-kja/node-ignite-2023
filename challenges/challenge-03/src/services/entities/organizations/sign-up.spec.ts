import bcrypt from 'bcryptjs'

import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization.repository'
import { OrganizationRepository } from '@/repositories/organization.repository'
import { InvalidCredentialsError } from '@/services/errors/invalid-credentials'
import { beforeEach, describe, expect, it } from 'vitest'
import { SignUpOrganizationUseCase } from './sign-up.service'

let organizationRepository: OrganizationRepository
let sut: SignUpOrganizationUseCase

describe('@use-case/organization/sign-up', async () => {
  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationRepository()
    sut = new SignUpOrganizationUseCase({ organizationRepository })
  })

  it('should be able to sign in with organization credentials', async () => {
    const password = '123321'
    const email = 'johndoe@example.com'

    const saltRounds = 8

    const password_hash = await bcrypt.hash(password, saltRounds)

    await organizationRepository.create({
      name: 'sign-in',
      email,
      password_hash,
      cep: 'test',
      address: 'test',
      whatsapp: 'test',
    })

    const { organization } = await sut.handle({
      email,
      password,
    })

    expect(organization).toEqual(
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

    await organizationRepository.create({
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

    await organizationRepository.create({
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
