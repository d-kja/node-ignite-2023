import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-in.repository'
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym.repository'
import { MaxDistanceReachedError } from '@/use-cases/errors/max-distance-reached-error'
import { MaxNumberOfCheckInsError } from '@/use-cases/errors/max-number-of-check-ins'
import { Decimal } from '@prisma/client/runtime/library'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckInUseCase } from './check-in.service'

let checkInRepository: InMemoryCheckInRepository
let gymRepository: InMemoryGymRepository
let sut: CheckInUseCase

let gymId: string

describe('@use-case/check-ins/check-in', async () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInRepository()
    gymRepository = new InMemoryGymRepository()

    sut = new CheckInUseCase(checkInRepository, gymRepository)

    const { id } = await gymRepository.create({
      title: 'js gym',
      description: '...',
      phone: '...',
      latitude: new Decimal(-27.2092052),
      longitude: new Decimal(-49.6401091),
    })

    gymId = id

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.handle({
      userId: 'user-id',
      gymId,
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    })

    expect(checkIn).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        created_at: expect.any(Date),
        user_id: expect.any(String),
        gym_id: expect.any(String),
      }),
    )
  })

  /**
   * @TDD -> Test Driven Development
   *
   * RED -> Force error/issue to occur
   * GREEN -> Make changes so that the error isn't going to happen anymore
   * REFACTOR -> Improve the code
   */

  it("shouldn't be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 12, 0, 0))

    await sut.handle({
      userId: 'user-id',
      gymId,
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    })

    await expect(() =>
      sut.handle({
        userId: 'user-id',
        gymId,
        userLatitude: -27.2092052,
        userLongitude: -49.6401091,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  /**
   * As we create tests we notice new problems that could occur with the current
   * implementation and we proceed to create more tests to cover those issues,
   * starting from the Red again.
   */

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 12, 0, 0))

    await sut.handle({
      userId: 'user-id',
      gymId,
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    })

    vi.setSystemTime(new Date(2023, 0, 2, 12, 0, 0))

    const { checkIn } = await sut.handle({
      userId: 'user-id',
      gymId,
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    })

    expect(checkIn).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        created_at: expect.any(Date),
        user_id: expect.any(String),
        gym_id: expect.any(String),
      }),
    )
  })

  it('should be able to check in when the distance exceeds thresh hold', async () => {
    await expect(() =>
      sut.handle({
        gymId,
        userId: 'user-id',
        userLatitude: -27.0747279,
        userLongitude: -49.4889672,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceReachedError)
  })
})
