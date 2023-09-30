import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet.repository'
import { PrismaUserRepository } from '@/repositories/prisma/prisma-user.repository'
import { CreatePetUseCase } from '../entities/pets/create.service'

export const makeCreatePetUseCase = () => {
  const petRepository = new PrismaPetRepository()
  const userRepository = new PrismaUserRepository()
  const useCase = new CreatePetUseCase({ petRepository, userRepository })

  return useCase
}
