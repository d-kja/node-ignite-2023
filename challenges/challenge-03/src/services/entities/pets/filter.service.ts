import {
  FilterByCharacteristicsParams,
  PetRepository,
} from '@/repositories/pet.repository'

interface FilterPetsUseCaseConstructorParams {
  petRepository: PetRepository
}

export class FilterPetsUseCase {
  private petRepository: PetRepository

  constructor({ petRepository }: FilterPetsUseCaseConstructorParams) {
    this.petRepository = petRepository
  }

  async handle(data: FilterByCharacteristicsParams) {
    const filteredPets = await this.petRepository.filterByCharacteristics(data)

    return {
      pets: filteredPets,
    }
  }
}
