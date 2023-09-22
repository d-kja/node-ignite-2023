import { getDistanceBetweenCoordinates } from '@/lib/utils/get-distance-between-coordinates'
import { CheckInRepository } from '@/repositories/check-in.repository'
import { GymRepository } from '@/repositories/gym.repository'
import { MaxDistanceReachedError } from '@/use-cases/errors/max-distance-reached-error'
import { MaxNumberOfCheckInsError } from '@/use-cases/errors/max-number-of-check-ins'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

interface CheckInUseCaseRequest {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

export class CheckInUseCase {
  constructor(
    private checkInRepository: CheckInRepository,
    private gymRepository: GymRepository,
  ) {}

  async handle({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: CheckInUseCaseRequest) {
    const gym = await this.gymRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFoundError()
    }

    // Compare cords to check distance from the gym
    const distanceInKm = getDistanceBetweenCoordinates(
      {
        latitude: userLatitude,
        longitude: userLongitude,
      },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      },
    )

    const DISTANCE_PERMITTED_IN_KM = 0.1 // 100 meters

    if (distanceInKm > DISTANCE_PERMITTED_IN_KM) {
      throw new MaxDistanceReachedError()
    }

    const hasUserCheckedInTodayAlready =
      await this.checkInRepository.getByUserIdOnDate(userId, new Date())

    if (hasUserCheckedInTodayAlready) {
      throw new MaxNumberOfCheckInsError()
    }

    const { checkIn } = await this.checkInRepository.create({
      user_id: userId,
      gym_id: gymId,
    })

    return {
      checkIn,
    }
  }
}
