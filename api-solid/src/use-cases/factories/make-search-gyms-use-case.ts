import { PrismaGymRepository } from '@/repositories/prisma/prisma-gym.repository'
import { SearchGymByQueryUseCase } from '../entities/gym/search-gym-by-query.servoce'

export const makeSearchGymsByQueryUseCase = () => {
  const repository = new PrismaGymRepository()
  const useCase = new SearchGymByQueryUseCase(repository)

  return useCase
}
