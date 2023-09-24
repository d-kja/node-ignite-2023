import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-check-in.repository'
import { FetchUserCheckInHistoryUseCase } from '../entities/check-in/fetch-user-check-in-history.service'

export const makeFetchUserCheckInsHistoryUseCase = () => {
  const repository = new PrismaCheckInRepository()
  const useCase = new FetchUserCheckInHistoryUseCase(repository)

  return useCase
}
