import { PrismaUserRepository } from '@/repositories/prisma/prisma-user.repository'
import { RegisterUserUseCase } from '../entities/user/register.service'

export const makeRegisterUserUseCase = () => {
  const repository = new PrismaUserRepository()
  const useCase = new RegisterUserUseCase(repository)

  return useCase
}
