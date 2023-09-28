import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet.repository'
import { PetRepository } from '@/repositories/pet.repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { ListAvailablePetsUseCase } from './list.service'

let petRepository: PetRepository
let sut: ListAvailablePetsUseCase

const petBase = {
  name: 'pet-example',
  description: '...',
  city: 'umuarama',
  state: 'PR',
  energy: 3,
  independence: 1,
  isClaustrophobic: true,
  org_id: 'invalid-id',
} as const

describe('@use-case/pets/list-available-pets', async () => {
  beforeEach(() => {
    petRepository = new InMemoryPetRepository()
    sut = new ListAvailablePetsUseCase({ petRepository })
  })

  it('should be able to list available pets', async () => {
    petRepository.create({
      ...petBase,
      name: 'adopted pet',
      isAdopted: true,
    })

    petRepository.create({
      ...petBase,
      name: 'non-adopted pet but with different city',
      city: 'navirai',
    })

    petRepository.create({
      ...petBase,
      name: 'non-adopted pet',
    })

    const { pets } = await sut.handle({ city: 'umuarama' })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([
      expect.objectContaining({
        name: 'non-adopted pet',
        isAdopted: false,
      }),
    ])
  })
})
