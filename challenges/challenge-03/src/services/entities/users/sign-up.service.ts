import { CreateUser } from '@/@types/repository/entities'
import { UserRepository } from '@/repositories/user.repository'
import { UserAlreadyExistsError } from '@/services/errors/user-already-exists'

import bcrypt from 'bcryptjs'

interface CreateUserUseCaseConstructorParams {
  userRepository: UserRepository
}

type CreateUserUseCaseRequest = Omit<CreateUser, 'password_hash'> & {
  password: string
}

export class CreateUserUseCase {
  private userRepository: UserRepository

  constructor({ userRepository }: CreateUserUseCaseConstructorParams) {
    this.userRepository = userRepository
  }

  async handle(data: CreateUserUseCaseRequest) {
    const userWithSameEmail = await this.userRepository.findByEmail(data.email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const saltRounds = 8
    const password_hash = await bcrypt.hash(data.password, saltRounds)

    const user = await this.userRepository.create({
      name: data.name,
      email: data.email,
      address: data.address,
      cep: data.cep,
      whatsapp: data.whatsapp,
      role: data.role,
      password_hash,
    })

    return { user }
  }
}
