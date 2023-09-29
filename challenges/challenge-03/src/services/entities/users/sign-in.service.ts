import bcrypt from 'bcryptjs'

import { UserRepository } from '@/repositories/user.repository'
import { InvalidCredentialsError } from '@/services/errors/invalid-credentials'

interface SignInUserUseCaseConstructorParams {
  userRepository: UserRepository
}

interface SignInUserUseCaseRequest {
  email: string
  password: string
}

export class SignInUserUseCase {
  private userRepository: UserRepository

  constructor({ userRepository }: SignInUserUseCaseConstructorParams) {
    this.userRepository = userRepository
  }

  async handle(data: SignInUserUseCaseRequest) {
    const user = await this.userRepository.findByEmail(data.email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const hashedPassword = await bcrypt.compare(
      data.password,
      user.password_hash,
    )

    if (!hashedPassword) {
      throw new InvalidCredentialsError()
    }

    return { user }
  }
}
