import { PrismaUserRepository } from '@/repositories/prisma/prisma-user.repository'
import { CreateUserUseCase } from '../entities/users/sign-up.service'

export const makeSignUpUserUseCase = () => {
  const repository = new PrismaUserRepository()
  const useCase = new CreateUserUseCase({ userRepository: repository })

  return useCase
}
