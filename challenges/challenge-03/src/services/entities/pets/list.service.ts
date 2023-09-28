import { PetRepository } from '@/repositories/pet.repository'

interface ListAvailablePetsUseCaseConstructorParams {
  petRepository: PetRepository
}

interface ListAvailablePetsRequest {
  city: string
}

export class ListAvailablePetsUseCase {
  private petRepository: PetRepository

  constructor({ petRepository }: ListAvailablePetsUseCaseConstructorParams) {
    this.petRepository = petRepository
  }

  async handle({ city }: ListAvailablePetsRequest) {
    const pets = await this.petRepository.findByCity(city)
    return { pets }
  }
}
