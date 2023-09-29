import { PrismaUserRepository } from '@/repositories/prisma/prisma-user.repository'
import { SignInUserUseCase } from '../entities/users/sign-in.service'

export const makeSignInUserUseCase = () => {
  const repository = new PrismaUserRepository()
  const useCase = new SignInUserUseCase({ userRepository: repository })

  return useCase
}
