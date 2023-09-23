import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym.repository'
import { Decimal } from '@prisma/client/runtime/library'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms.service'

let gymRepository: InMemoryGymRepository
let sut: FetchNearbyGymsUseCase

describe('@use-case/gym/register', async () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymRepository()
    sut = new FetchNearbyGymsUseCase(gymRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymRepository.create({
      title: 'Nearby',
      description: null,
      phone: null,
      latitude: new Decimal(-27.2092052),
      longitude: new Decimal(-49.6401091),
    })
    await gymRepository.create({
      title: 'Far away',
      description: null,
      phone: null,
      latitude: new Decimal(-27.0610928),
      longitude: new Decimal(-49.5529501),
    })

    const { gyms } = await sut.handle({
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'Nearby',
      }),
    ])
  })
})
