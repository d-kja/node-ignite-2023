import { PrismaGymRepository } from '@/repositories/prisma/prisma-gym.repository'
import { RegisterGymUseCase } from '../entities/gym/register.service'

export const makeRegisterGymUseCase = () => {
  const repository = new PrismaGymRepository()
  const useCase = new RegisterGymUseCase(repository)

  return useCase
}
