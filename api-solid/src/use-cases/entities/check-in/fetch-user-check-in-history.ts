import { CheckInRepository } from '@/repositories/check-in.repository'

interface FetchUserCheckInHistoryUseCaseRequest {
  userId: string
  page?: number
}

export class FetchUserCheckInHistoryUseCase {
  constructor(private checkInRepository: CheckInRepository) {}

  async handle({ userId, page = 1 }: FetchUserCheckInHistoryUseCaseRequest) {
    const { checkIns } = await this.checkInRepository.getManyByUserId(
      userId,
      page,
    )

    return { checkIns }
  }
}
