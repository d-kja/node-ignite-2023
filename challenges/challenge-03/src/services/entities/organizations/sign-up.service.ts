import { CreateUser } from '@/@types/repository/entities'
import { UserRepository } from '@/repositories/user.repository'

import bcrypt from 'bcryptjs'

interface CreateOrganizationUseCaseConstructorParams {
  userRepository: UserRepository
}

type CreateOrganizationUseCaseRequest = Omit<CreateUser, 'password_hash'> & {
  password: string
}

export class CreateOrganizationUseCase {
  private userRepository: UserRepository

  constructor({ userRepository }: CreateOrganizationUseCaseConstructorParams) {
    this.userRepository = userRepository
  }

  async handle(data: CreateOrganizationUseCaseRequest) {
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
