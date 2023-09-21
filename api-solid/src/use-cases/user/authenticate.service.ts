import { UserRepository } from '@/repositories/user.repository'
import { User } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

interface AuthenticateUserUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUserUseCaseResponse {
  user: User
}

export class AuthenticateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async handle({
    email,
    password,
  }: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatch = await bcrypt.compare(password, user.password_hash)

    if (!doesPasswordMatch) {
      throw new InvalidCredentialsError()
    }

    return { user }
  }
}
