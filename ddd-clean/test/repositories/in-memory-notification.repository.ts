import { NotificationRepository } from '@/domain/notifications/application/repositories/notifications-repository'
import { Notification } from '@/domain/notifications/enterprise/entities/notification.entity'

export class InMemoryNotificationRepository implements NotificationRepository {
  public items: Notification[] = []

  async create(notification: Notification): Promise<void> {
    this.items.push(notification)
  }

  async save(notification: Notification): Promise<void> {
    const notificationIndex = this.items.findIndex(
      (item) => item.id.toString() === notification.id.toString(),
    )

    this.items[notificationIndex] = notification
  }

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = this.items.find(
      (item) => item.id.toString() === notificationId,
    )

    if (!notification) return null

    return notification
  }
}
