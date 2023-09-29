import {
  FilterByCharacteristicsParams,
  FilterByCharacteristicsSchema,
  PetRepository,
} from '@/repositories/pet.repository'

interface FilterPetsUseCaseConstructorParams {
  petRepository: PetRepository
}

interface FilterPetsUseCaseRequest extends FilterByCharacteristicsParams {
  page?: number
}

export class FilterPetsUseCase {
  private petRepository: PetRepository

  constructor({ petRepository }: FilterPetsUseCaseConstructorParams) {
    this.petRepository = petRepository
  }

  async handle({ page = 1, ...rest }: FilterPetsUseCaseRequest) {
    const validatedData = FilterByCharacteristicsSchema.parse(rest)

    const filteredPets = await this.petRepository.filterByCharacteristics(
      validatedData,
      page,
    )

    return {
      pets: filteredPets,
    }
  }
}
