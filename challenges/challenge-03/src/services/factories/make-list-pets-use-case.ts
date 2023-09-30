import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet.repository'
import { ListAvailablePetsUseCase } from '../entities/pets/list.service'

export const makeListPetsUseCase = () => {
  const repository = new PrismaPetRepository()
  const useCase = new ListAvailablePetsUseCase({ petRepository: repository })

  return useCase
}
