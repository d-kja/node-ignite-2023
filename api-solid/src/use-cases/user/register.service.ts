import bcrypt from 'bcryptjs'

import { UserRepository } from '@/repositories/user.repository'
import { UserAlreadyExistsError } from '../errors/user-already-exists.error'

interface RegisterUserUseCaseType {
  name: string
  email: string
  password: string
}

export class RegisterUserUseCase {
  // by giving the special keyword private/public/protected inside the parameters of the constructor it automatically creates the variable inside the scope
  constructor(private userRepository: UserRepository) {}

  async handle({ name, email, password }: RegisterUserUseCaseType) {
    const userWithSameEmail = await this.userRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const saltRounds = 6
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = await this.userRepository.create({
      name,
      email,
      password_hash: passwordHash,
    })

    return user
  }
}
