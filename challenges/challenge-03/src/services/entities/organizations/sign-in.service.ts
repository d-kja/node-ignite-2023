import bcrypt from 'bcryptjs'

import { UserRepository } from '@/repositories/user.repository'
import { InvalidCredentialsError } from '@/services/errors/invalid-credentials'

interface SignUpOrganizationUseCaseConstructorParams {
  userRepository: UserRepository
}

interface SignUpOrganizationUseCaseRequest {
  email: string
  password: string
}

export class SignUpOrganizationUseCase {
  private userRepository: UserRepository

  constructor({ userRepository }: SignUpOrganizationUseCaseConstructorParams) {
    this.userRepository = userRepository
  }

  async handle(data: SignUpOrganizationUseCaseRequest) {
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
