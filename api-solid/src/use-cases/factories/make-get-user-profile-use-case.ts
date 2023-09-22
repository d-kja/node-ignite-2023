import { PrismaUserRepository } from '@/repositories/prisma/prisma-user.repository'
import { GetUserProfileUseCase } from '../entities/user/get-profile.service'

export const makeGetUserProfileUseCase = () => {
  const userRepository = new PrismaUserRepository()
  const getUserProfileUseCase = new GetUserProfileUseCase(userRepository)

  return getUserProfileUseCase
}
