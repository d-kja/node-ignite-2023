import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet.repository'
import { FilterPetsUseCase } from '../entities/pets/filter.service'

export const makeFilterPetsUseCase = () => {
  const repository = new PrismaPetRepository()
  const useCase = new FilterPetsUseCase({ petRepository: repository })

  return useCase
}
