import { PrismaUserRepository } from '@/repositories/prisma/prisma-user.repository'
import { RegisterUserUseCase } from '../user/register.service'

export const makeRegisterUserUseCase = () => {
  const usersRepository = new PrismaUserRepository()
  const registerUserUseCase = new RegisterUserUseCase(usersRepository)

  return registerUserUseCase
}
