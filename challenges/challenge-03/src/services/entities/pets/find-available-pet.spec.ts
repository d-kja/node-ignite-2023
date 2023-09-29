import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet.repository'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user.repository'
import { PetRepository } from '@/repositories/pet.repository'
import { UserRepository } from '@/repositories/user.repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FindAvailablePetUseCase } from './find-available-pet.service'

let petRepository: PetRepository
let userRepository: UserRepository
let sut: FindAvailablePetUseCase

let userId: string

describe('@use-case/pets/find-available-pet', async () => {
  beforeEach(async () => {
    petRepository = new InMemoryPetRepository()
    userRepository = new InMemoryUserRepository()
    sut = new FindAvailablePetUseCase({ petRepository })

    const org = await userRepository.create({
      name: 'test',
      email: 'test',
      cep: 'test',
      address: 'test',
      password_hash: 'test',
      whatsapp: 'test',
    })

    userId = org.id
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
      user_id: userId,
    } as const

    const { id } = await petRepository.create(petData)
    const { pet } = await sut.handle({ petId: id })

    expect(pet).toEqual(expect.objectContaining(petData))
  })
})
