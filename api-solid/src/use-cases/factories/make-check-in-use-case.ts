import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-check-in.repository'
import { PrismaGymRepository } from '@/repositories/prisma/prisma-gym.repository'
import { CheckInUseCase } from '../entities/check-in/check-in.service'

export const makeCheckInUseCase = () => {
  const checkInRepository = new PrismaCheckInRepository()
  const gymRepository = new PrismaGymRepository()

  const checkInUseCase = new CheckInUseCase(checkInRepository, gymRepository)

  return checkInUseCase
}
