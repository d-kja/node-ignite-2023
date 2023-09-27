import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization.repository'
import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet.repository'
import { OrganizationRepository } from '@/repositories/organization.repository'
import { PetRepository } from '@/repositories/pet.repository'
import { ResourceNotFoundError } from '@/services/errors/resource-not-found'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreatePetUseCase } from './create.service'

let petRepository: PetRepository
let organizationRepository: OrganizationRepository
let sut: CreatePetUseCase

describe('@use-case/pets/create', async () => {
  beforeEach(async () => {
    petRepository = new InMemoryPetRepository()
    organizationRepository = new InMemoryOrganizationRepository()

    sut = new CreatePetUseCase({
      petRepository,
      organizationRepository,
    })
  })

  it('should be able to create a new pet', async () => {
    const organization = await organizationRepository.create({
      name: 'test',
      email: 'test',
      cep: 'test',
      address: 'test',
      password_hash: 'test',
      whatsapp: 'test',
    })

    const petData = {
      name: 'pet-example',
      description: '...',
      city: 'umuarama',
      state: 'PR',
      energy: 3,
      independence: 1,
      isClaustrophobic: true,
      org_id: organization.id,
    } as const

    const { pet } = await sut.handle(petData)

    expect(pet).toEqual(expect.objectContaining(petData))
  })

  it("shouldn't be able to create a new pet with an invalid organization id", async () => {
    const petData = {
      name: 'pet-example',
      description: '...',
      city: 'umuarama',
      state: 'PR',
      energy: 3,
      independence: 1,
      isClaustrophobic: true,
      org_id: 'invalid-id',
    } as const

    await expect(() => sut.handle(petData)).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    )
  })
})
