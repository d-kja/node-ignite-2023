import { UserRepository } from '@/repositories/user.repository'
import { hash } from 'bcrypt'

interface RegisterUserUseCaseType {
  name: string
  email: string
  password: string
}

export class RegisterUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async handle({ name, email, password }: RegisterUserUseCaseType) {
    const saltRounds = 6
    const passwordHash = await hash(password, saltRounds)

    await this.userRepository.create({
      name,
      email,
      password_hash: passwordHash,
    })
  }
}
