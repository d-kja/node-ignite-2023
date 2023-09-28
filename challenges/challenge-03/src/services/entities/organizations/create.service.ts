import { CreateOrganization } from '@/@types/repository/entities'
import { OrganizationRepository } from '@/repositories/organization.repository'

import bcrypt from 'bcryptjs'

interface CreateOrganizationUseCaseConstructorParams {
  organizationRepository: OrganizationRepository
}

type CreateOrganizationUseCaseRequest = Omit<
  CreateOrganization,
  'password_hash'
> & {
  password: string
}

export class CreateOrganizationUseCase {
  private organizationRepository: OrganizationRepository

  constructor({
    organizationRepository,
  }: CreateOrganizationUseCaseConstructorParams) {
    this.organizationRepository = organizationRepository
  }

  async handle(data: CreateOrganizationUseCaseRequest) {
    const saltRounds = 8
    const password_hash = await bcrypt.hash(data.password, saltRounds)

    const organization = await this.organizationRepository.create({
      name: data.name,
      email: data.email,
      address: data.address,
      cep: data.cep,
      whatsapp: data.whatsapp,
      password_hash,
    })

    return { organization }
  }
}
