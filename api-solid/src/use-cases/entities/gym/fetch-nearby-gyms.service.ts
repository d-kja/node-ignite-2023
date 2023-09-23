import { GymRepository } from '@/repositories/gym.repository'

interface FetchNearbyGymsUseCaseRequest {
  userLatitude: number
  userLongitude: number
}

export class FetchNearbyGymsUseCase {
  constructor(private gymRepository: GymRepository) {}

  async handle({ userLatitude, userLongitude }: FetchNearbyGymsUseCaseRequest) {
    const gyms = await this.gymRepository.findManyByDistance({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return {
      gyms,
    }
  }
}
