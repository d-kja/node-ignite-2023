import { CreatePet } from '@/@types/repository/entities'
import { OrganizationRepository } from '@/repositories/organization.repository'
import { PetRepository } from '@/repositories/pet.repository'
import { ResourceNotFoundError } from '@/services/errors/resource-not-found'

interface CreatePetUseCaseConstructorParams {
  petRepository: PetRepository
  organizationRepository: OrganizationRepository
}

export class CreatePetUseCase {
  private petRepository: PetRepository
  private organizationRepository: OrganizationRepository

  constructor({
    petRepository,
    organizationRepository,
  }: CreatePetUseCaseConstructorParams) {
    this.petRepository = petRepository
    this.organizationRepository = organizationRepository
  }

  async handle(data: CreatePet) {
    const hasValidOrganization = await this.organizationRepository.findById(
      data.org_id,
    )

    if (!hasValidOrganization) {
      throw new ResourceNotFoundError()
    }

    const pet = await this.petRepository.create(data)

    return { pet }
  }
}
