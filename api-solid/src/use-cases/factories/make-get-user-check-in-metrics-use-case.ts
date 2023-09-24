import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-check-in.repository'
import { GetUserCheckInMetricsUseCase } from '../entities/check-in/get-user-check-in-metrics.service'

export const makeGetUserCheckInMetricsUseCase = () => {
  const repository = new PrismaCheckInRepository()
  const useCase = new GetUserCheckInMetricsUseCase(repository)

  return useCase
}
