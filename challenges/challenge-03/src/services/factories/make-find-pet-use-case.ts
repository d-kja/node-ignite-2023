import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet.repository'
import { FindAvailablePetUseCase } from '../entities/pets/find-available-pet.service'

export const makeFindPetUseCase = () => {
  const repository = new PrismaPetRepository()
  const useCase = new FindAvailablePetUseCase({ petRepository: repository })

  return useCase
}
