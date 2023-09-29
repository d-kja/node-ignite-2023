import { CreatePet } from '@/@types/repository/entities'
import { PetRepository } from '@/repositories/pet.repository'
import { UserRepository } from '@/repositories/user.repository'
import { ResourceNotFoundError } from '@/services/errors/resource-not-found'

interface CreatePetUseCaseConstructorParams {
  petRepository: PetRepository
  userRepository: UserRepository
}

export class CreatePetUseCase {
  private petRepository: PetRepository
  private userRepository: UserRepository

  constructor({
    petRepository,
    userRepository,
  }: CreatePetUseCaseConstructorParams) {
    this.petRepository = petRepository
    this.userRepository = userRepository
  }

  async handle(data: CreatePet) {
    const hasValidUser = await this.userRepository.findById(data.user_id)

    if (!hasValidUser) {
      throw new ResourceNotFoundError()
    }

    const pet = await this.petRepository.create(data)

    return { pet }
  }
}
