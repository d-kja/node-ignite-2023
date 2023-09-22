import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-in.repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchUserCheckInHistoryUseCase } from './fetch-user-check-in-history'

let checkInRepository: InMemoryCheckInRepository
let sut: FetchUserCheckInHistoryUseCase

describe('@use-case/check-in/user-check-in-history', async () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInRepository()
    sut = new FetchUserCheckInHistoryUseCase(checkInRepository)
  })

  it('should be able to get user check ins', async () => {
    await checkInRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })
    await checkInRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    })

    const { checkIns } = await sut.handle({
      userId: 'user-01',
    })

    expect(checkIns).toHaveLength(2)

    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-01' }),
      expect.objectContaining({ gym_id: 'gym-02' }),
    ])
  })

  it('should return check-ins history according to page', async () => {
    for (let index = 1; index <= 22; index++) {
      await checkInRepository.create({
        gym_id: `gym-${index}`,
        user_id: 'user-01',
      })
    }

    const { checkIns } = await sut.handle({
      userId: 'user-01',
      page: 2,
    })

    expect(checkIns).toHaveLength(2)

    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-21' }),
      expect.objectContaining({ gym_id: 'gym-22' }),
    ])
  })
})
