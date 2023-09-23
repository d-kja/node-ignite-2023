import { CheckInRepository } from '@/repositories/check-in.repository'
import { LateCheckInValidationError } from '@/use-cases/errors/late-check-in-validation-error'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { CheckIn } from '@prisma/client'
import dayjs from 'dayjs'

interface ValidateCheckInUseCaseRequest {
  checkInId: string
}
interface ValidateCheckInUseCaseResponse {
  checkIn: CheckIn
}

export class ValidateCheckInUseCase {
  constructor(private checkInRepository: CheckInRepository) {}

  async handle({
    checkInId,
  }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const data = await this.checkInRepository.getById(checkInId)

    if (!data?.checkIn) throw new ResourceNotFoundError()

    const now = new Date()

    const spanFromCheckInCreationUntilNowInMinutes = dayjs(now).diff(
      data.checkIn.created_at,
      'minutes',
    )

    if (spanFromCheckInCreationUntilNowInMinutes > 20) {
      throw new LateCheckInValidationError()
    }

    data.checkIn.validated_at = now

    const validatedCheckIn = await this.checkInRepository.update(data.checkIn)

    return {
      checkIn: validatedCheckIn.checkIn,
    }
  }
}
