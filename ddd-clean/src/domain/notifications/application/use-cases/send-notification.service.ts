import { Either, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Notification } from '../../enterprise/entities/notification.entity'
import { NotificationRepository } from '../repositories/notifications-repository'

interface SendNotificationUseCaseRequest {
  recipientId: string
  content: string
  title: string
}

type SendNotificationUseCaseResponse = Either<
  null,
  {
    notification: Notification
  }
>

export class SendNotificationUseCase {
  constructor(private notificationRepository: NotificationRepository) {}

  async handle({
    content,
    title,
    recipientId,
  }: SendNotificationUseCaseRequest): Promise<SendNotificationUseCaseResponse> {
    const notification = Notification.create({
      recipientId: new UniqueEntityID(recipientId),
      content,
      title,
    })

    await this.notificationRepository.create(notification)

    return right({
      notification,
    })
  }
}
