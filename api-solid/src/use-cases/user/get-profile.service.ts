import { UserRepository } from '@/repositories/user.repository'
import { User } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface GetUserProfileUseCaseRequest {
  id: string
}

interface GetUserProfileUseCaseResponse {
  user: User
}

export class GetUserProfileUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async handle({
    id,
  }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.userRepository.findById(id)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return { user }
  }
}
