import { CheckInRepository } from '@/repositories/check-in.repository'

interface GetUserCheckInMetricsUseCaseRequest {
  userId: string
}
interface GetUserCheckInMetricsUseCaseResponse {
  totalCheckIns: number
}

export class GetUserCheckInMetricsUseCase {
  constructor(private checkInRepository: CheckInRepository) {}

  async handle({
    userId,
  }: GetUserCheckInMetricsUseCaseRequest): Promise<GetUserCheckInMetricsUseCaseResponse> {
    const { totalCheckIns = 0 } =
      (await this.checkInRepository.getCountByUserId(userId)) ?? {}

    return {
      totalCheckIns,
    }
  }
}
