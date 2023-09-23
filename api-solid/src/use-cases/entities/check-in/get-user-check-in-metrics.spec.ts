import { CheckInRepository } from '@/repositories/check-in.repository'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-in.repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetUserCheckInMetricsUseCase } from './get-user-check-in-metrics.service'

let checkInRepository: CheckInRepository
let sut: GetUserCheckInMetricsUseCase

describe('@use-case/check-in/get-user-check-in-metrics', async () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInRepository()
    sut = new GetUserCheckInMetricsUseCase(checkInRepository)
  })

  it('should be able to get the check-ins count', async () => {
    await checkInRepository.create({
      user_id: 'user-id',
      gym_id: 'gym-id',
    })
    await checkInRepository.create({
      user_id: 'user-id',
      gym_id: 'gym-id',
    })

    const { totalCheckIns } = await sut.handle({
      userId: 'user-id',
    })

    expect(totalCheckIns).toEqual(2)
  })
})
