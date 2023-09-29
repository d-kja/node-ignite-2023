import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet.repository'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user.repository'
import { PetRepository } from '@/repositories/pet.repository'
import { UserRepository } from '@/repositories/user.repository'
import { FilterPetsUseCase } from './filter.service'

let userRepository: UserRepository
let petRepository: PetRepository
let sut: FilterPetsUseCase

let userId: string

describe('@use-case/pets/filter-by-characteristics', async () => {
  beforeEach(async () => {
    petRepository = new InMemoryPetRepository()
    userRepository = new InMemoryUserRepository()
    sut = new FilterPetsUseCase({ petRepository })

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

  it('should be able to filter pets', async () => {
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
      city: 'umuarama',
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
      user_id: userId,
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
      city: 'umuarama',
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

  it("shouldn't be able to filter without city", async () => {
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
      city: 'navirai',
    })

    await expect(() =>
      sut.handle({
        size: 'SMOL',
      } as any),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should implement pagination', async () => {
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

    for (let index = 1; index <= 22; index++) {
      await petRepository.create({
        ...petData,
        name: `pet-${index}`,
      })
    }

    const { pets } = await sut.handle({
      city: 'umuarama',
      page: 2,
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({
        name: 'pet-21',
      }),
      expect.objectContaining({
        name: 'pet-22',
      }),
    ])
  })
})
