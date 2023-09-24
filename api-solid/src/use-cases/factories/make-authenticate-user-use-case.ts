import { PrismaUserRepository } from '@/repositories/prisma/prisma-user.repository'
import { AuthenticateUserUseCase } from '../entities/user/authenticate.service'

export const makeAuthenticateUserUseCase = () => {
  const repository = new PrismaUserRepository()
  const useCase = new AuthenticateUserUseCase(repository)

  return useCase
}
