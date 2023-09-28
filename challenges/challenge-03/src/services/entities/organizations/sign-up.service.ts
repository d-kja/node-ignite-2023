import bcrypt from 'bcryptjs'

import { OrganizationRepository } from '@/repositories/organization.repository'
import { InvalidCredentialsError } from '@/services/errors/invalid-credentials'

interface SignUpOrganizationUseCaseConstructorParams {
  organizationRepository: OrganizationRepository
}

interface SignUpOrganizationUseCaseRequest {
  email: string
  password: string
}

export class SignUpOrganizationUseCase {
  private organizationRepository: OrganizationRepository

  constructor({
    organizationRepository,
  }: SignUpOrganizationUseCaseConstructorParams) {
    this.organizationRepository = organizationRepository
  }

  async handle(data: SignUpOrganizationUseCaseRequest) {
    const organization = await this.organizationRepository.findByEmail(
      data.email,
    )

    if (!organization) {
      throw new InvalidCredentialsError()
    }

    const hashedPassword = await bcrypt.compare(
      data.password,
      organization.password_hash,
    )

    if (!hashedPassword) {
      throw new InvalidCredentialsError()
    }

    return { organization }
  }
}
