import { GymRepository } from '@/repositories/gym.repository'

interface CreateGymUseCaseRequest {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

export class RegisterGymUseCase {
  constructor(private readonly gymRepository: GymRepository) {}

  async handle({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: CreateGymUseCaseRequest) {
    const gym = await this.gymRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    })

    return { gym }
  }
}
