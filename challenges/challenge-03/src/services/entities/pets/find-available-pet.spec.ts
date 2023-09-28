import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization.repository'
import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet.repository'
import { OrganizationRepository } from '@/repositories/organization.repository'
import { PetRepository } from '@/repositories/pet.repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FindAvailablePetUseCase } from './find-available-pet.service'

let petRepository: PetRepository
let organizationRepository: OrganizationRepository
let sut: FindAvailablePetUseCase

let orgId: string

describe('@use-case/pets/find-available-pet', async () => {
  beforeEach(async () => {
    petRepository = new InMemoryPetRepository()
    organizationRepository = new InMemoryOrganizationRepository()
    sut = new FindAvailablePetUseCase({ petRepository })

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

  it('should be able to find a pet', async () => {
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

    const { id } = await petRepository.create(petData)
    const { pet } = await sut.handle({ petId: id })

    expect(pet).toEqual(expect.objectContaining(petData))
  })
})
