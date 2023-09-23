import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-in.repository'
import { LateCheckInValidationError } from '@/use-cases/errors/late-check-in-validation-error'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ValidateCheckInUseCase } from './validate-check-in.service'

let checkInRepository: InMemoryCheckInRepository
let sut: ValidateCheckInUseCase

describe('@use-case/check-in/get-user-check-in-metrics', async () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInRepository()
    sut = new ValidateCheckInUseCase(checkInRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to validate the check-in', async () => {
    const { checkIn: createdCheckIn } = await checkInRepository.create({
      user_id: 'user-id',
      gym_id: 'gym-id',
    })

    const { checkIn } = await sut.handle({ checkInId: createdCheckIn.id })

    expect(checkIn).toEqual(
      expect.objectContaining({
        validated_at: expect.any(Date),
      }),
    )
    expect(checkInRepository.checkIns[0].validated_at).toEqual(expect.any(Date))
  })

  it("shouldn't be able to validate a check-in that doesn't exist", async () => {
    await expect(() =>
      sut.handle({
        checkInId: 'inexistent-check-in-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it("shouldn't be able to validate a check-in after 20 minutes has passed", async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40))

    const { checkIn: createdCheckIn } = await checkInRepository.create({
      user_id: 'user-id',
      gym_id: 'gym-id',
    })

    const TWENTY_AND_ONE_MINUTES_IN_MS = 1000 * 60 * 21
    vi.advanceTimersByTime(TWENTY_AND_ONE_MINUTES_IN_MS)

    await expect(() =>
      sut.handle({ checkInId: createdCheckIn.id }),
    ).rejects.toBeInstanceOf(LateCheckInValidationError)
  })
})
