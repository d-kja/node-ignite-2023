import bcrypt from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization.repository'
import { OrganizationRepository } from '@/repositories/organization.repository'
import { CreateOrganizationUseCase } from './create.service'

let organizationRepository: OrganizationRepository
let sut: CreateOrganizationUseCase

describe('@use-case/organization/create', async () => {
  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationRepository()
    sut = new CreateOrganizationUseCase({ organizationRepository })
  })

  it('should be able to create a new organization', async () => {
    const { organization } = await sut.handle({
      name: 'test',
      email: 'test',
      cep: 'test',
      address: 'test',
      password: 'test',
      whatsapp: 'test',
    })

    expect(organization).toEqual(
      expect.objectContaining({
        id: expect.any(String),
      }),
    )
  })

  it('should hash the password when persisting data', async () => {
    const password = '120392130'

    const { organization } = await sut.handle({
      name: 'test',
      email: 'test',
      cep: 'test',
      address: 'test',
      password,
      whatsapp: 'test',
    })

    const saltRounds = 8

    const comparePassword = await bcrypt.compare(
      password,
      organization.password_hash,
    )

    expect(comparePassword).toEqual(true)
  })
})
