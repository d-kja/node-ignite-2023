import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization.repository'
import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet.repository'
import { OrganizationRepository } from '@/repositories/organization.repository'
import { PetRepository } from '@/repositories/pet.repository'
import { FilterPetsUseCase } from './filter.service'

let organizationRepository: OrganizationRepository
let petRepository: PetRepository
let sut: FilterPetsUseCase

let orgId: string

describe('@use-case/pets/filter-by-characteristics', async () => {
  beforeEach(async () => {
    petRepository = new InMemoryPetRepository()
    organizationRepository = new InMemoryOrganizationRepository()
    sut = new FilterPetsUseCase({ petRepository })

    const org = await organizationRepository.create({
      name: 'test',
      email: 'test',
      cep: 'test',
      address: 'test',
      password_hash: 'test',
      whatsapp: 'test',
    })

    orgId = org.id
  })

  it('should be able to filter pets', async () => {
    const petData = {
      name: 'pet-example',
      description: '...',
      city: 'umuarama',
      state: 'PR',
      energy: 3,
      independence: 1,
      isClaustrophobic: true,
      org_id: orgId,
    } as const

    await petRepository.create({
      ...petData,
      size: 'LARGE',
      independence: 1,
    })

    await petRepository.create({
      ...petData,
      size: 'SMOL',
    })

    await petRepository.create({
      ...petData,
      size: 'SMOL',
      energy: 1,
      isClaustrophobic: true,
      independence: 3,
    })

    const { pets } = await sut.handle({
      size: 'SMOL',
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          size: 'SMOL',
          energy: 1,
          isClaustrophobic: true,
          independence: 3,
        }),
        expect.objectContaining({
          size: 'SMOL',
        }),
      ]),
    )
  })

  it('should be able to filter with more than one property pets', async () => {
    const petData = {
      name: 'pet-example',
      description: '...',
      city: 'umuarama',
      state: 'PR',
      energy: 3,
      independence: 1,
      isClaustrophobic: true,
      org_id: orgId,
    } as const

    await petRepository.create({
      ...petData,
      size: 'LARGE',
      independence: 1,
      energy: 1,
    })

    await petRepository.create({
      ...petData,
      size: 'SMOL',
    })

    await petRepository.create({
      ...petData,
      size: 'SMOL',
      energy: 1,
      isClaustrophobic: true,
      independence: 3,
    })

    const { pets } = await sut.handle({
      size: 'SMOL',
      energy: 1,
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          size: 'SMOL',
          energy: 1,
          isClaustrophobic: true,
          independence: 3,
        }),
      ]),
    )
  })
})
