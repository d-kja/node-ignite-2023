import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-check-in.repository'
import { CheckInUseCase } from '../entities/check-in/check-in.service'

export const makeCheckInUseCase = () => {
  const checkInRepository = new PrismaCheckInRepository()
  const checkInUseCase = new CheckInUseCase(checkInRepository)

  return checkInUseCase
}
