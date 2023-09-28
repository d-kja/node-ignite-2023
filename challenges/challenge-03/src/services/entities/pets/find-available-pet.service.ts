import { PetRepository } from '@/repositories/pet.repository'

interface FindAvailablePetUseCaseConstructorParams {
  petRepository: PetRepository
}

interface FindAvailablePetUseCaseRequest {
  petId: string
}

export class FindAvailablePetUseCase {
  private petRepository: PetRepository

  constructor({ petRepository }: FindAvailablePetUseCaseConstructorParams) {
    this.petRepository = petRepository
  }

  async handle({ petId }: FindAvailablePetUseCaseRequest) {
    const pet = await this.petRepository.findById(petId)

    return { pet }
  }
}
