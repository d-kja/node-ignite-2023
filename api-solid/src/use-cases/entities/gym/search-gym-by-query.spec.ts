import { GymRepository } from '@/repositories/gym.repository'
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym.repository'
import { Decimal } from '@prisma/client/runtime/library'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchGymByQueryUseCase } from './search-gym-by-query.servoce'

let gymRepository: GymRepository
let sut: SearchGymByQueryUseCase

describe('@use-case/gym/search-gym-by-query', async () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymRepository()
    sut = new SearchGymByQueryUseCase(gymRepository)
  })

  it('should be able to search gyms using given query', async () => {
    await gymRepository.create({
      title: 'Javascript gym',
      description: '...',
      phone: '...',
      latitude: new Decimal(-27.2092052),
      longitude: new Decimal(-49.6401091),
    })
    await gymRepository.create({
      title: 'Typescript gym',
      description: '...',
      phone: '...',
      latitude: new Decimal(-27.2092052),
      longitude: new Decimal(-49.6401091),
    })

    const { gyms } = await sut.handle('javascript', 1)

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'Javascript gym',
      }),
    ])
  })

  it('should be able to return the query result with pagination', async () => {
    for (let index = 1; index <= 22; index++) {
      await gymRepository.create({
        title: `Javascript gym ${index}`,
        description: '...',
        phone: '...',
        latitude: new Decimal(-27.2092052),
        longitude: new Decimal(-49.6401091),
      })
    }

    const { gyms } = await sut.handle('Javascript', 2)

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'Javascript gym 21',
      }),
      expect.objectContaining({
        title: 'Javascript gym 22',
      }),
    ])
  })
})
