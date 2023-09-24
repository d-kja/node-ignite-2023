import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-check-in.repository'
import { ValidateCheckInUseCase } from '../entities/check-in/validate-check-in.service'

export const makeValidateCheckInUseCase = () => {
  const repository = new PrismaCheckInRepository()
  const useCase = new ValidateCheckInUseCase(repository)

  return useCase
}
