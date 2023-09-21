import { PrismaUserRepository } from '@/repositories/prisma/prisma-user.repository'
import { AuthenticateUserUseCase } from '../user/authenticate.service'

export const makeAuthenticateUserUseCase = () => {
  const userRepository = new PrismaUserRepository()
  const authenticateUseCase = new AuthenticateUserUseCase(userRepository)

  return authenticateUseCase
}
