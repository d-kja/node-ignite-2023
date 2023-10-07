import { Notification } from '../../enterprise/entities/notification.entity'

export interface NotificationRepository {
  create(notification: Notification): Promise<void>
  save(notification: Notification): Promise<void>
  findById(notificationId: string): Promise<Notification | null>
}
