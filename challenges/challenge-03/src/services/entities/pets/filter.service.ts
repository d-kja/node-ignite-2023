import {
  FilterByCharacteristicsParams,
  FilterByCharacteristicsSchema,
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
    const validatedData = FilterByCharacteristicsSchema.parse(data)

    const filteredPets =
      await this.petRepository.filterByCharacteristics(validatedData)

    return {
      pets: filteredPets,
    }
  }
}
