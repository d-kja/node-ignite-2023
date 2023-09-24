import { PrismaUserRepository } from '@/repositories/prisma/prisma-user.repository'
import { GetUserProfileUseCase } from '../entities/user/get-profile.service'

export const makeGetUserProfileUseCase = () => {
  const repository = new PrismaUserRepository()
  const useCase = new GetUserProfileUseCase(repository)

  return useCase
}
