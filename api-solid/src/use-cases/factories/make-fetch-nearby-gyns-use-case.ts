import { PrismaGymRepository } from '@/repositories/prisma/prisma-gym.repository'
import { FetchNearbyGymsUseCase } from '../entities/gym/fetch-nearby-gyms.service'

export const makeFetchNearbyGymsUseCase = () => {
  const repository = new PrismaGymRepository()
  const useCase = new FetchNearbyGymsUseCase(repository)

  return useCase
}
