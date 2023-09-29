import { PetRepository } from '@/repositories/pet.repository'

interface ListAvailablePetsUseCaseConstructorParams {
  petRepository: PetRepository
}

interface ListAvailablePetsRequest {
  city: string
  page?: number
}

export class ListAvailablePetsUseCase {
  private petRepository: PetRepository

  constructor({ petRepository }: ListAvailablePetsUseCaseConstructorParams) {
    this.petRepository = petRepository
  }

  async handle({ city, page = 1 }: ListAvailablePetsRequest) {
    const pets = await this.petRepository.findByCity(city, page)
    return { pets }
  }
}
