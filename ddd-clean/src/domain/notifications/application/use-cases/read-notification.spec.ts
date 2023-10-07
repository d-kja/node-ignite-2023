import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/error/errors/not-allowed-error'
import { makeNotification } from 'test/factories/make-notification'
import { InMemoryNotificationRepository } from 'test/repositories/in-memory-notification.repository'
import { ReadNotificationUseCase } from './read-notification.service'

let repository: InMemoryNotificationRepository
let sut: ReadNotificationUseCase

describe('@use-case/notifications/read-notification', async () => {
  beforeEach(() => {
    repository = new InMemoryNotificationRepository()
    sut = new ReadNotificationUseCase(repository)
  })

  it('should be able to read a notification', async () => {
    const notification = makeNotification()
    await repository.create(notification)

    const result = await sut.handle({
      notificationId: notification.id.toString(),
      recipientId: notification.recipientId.toString(),
    })

    expect(result.isRight()).toBeTruthy()

    if (!result.isRight()) {
      throw new Error('invalid test')
    }
    expect(repository.items[0]).toEqual(result.value.notification)
  })

  it("shouldn't be able to read a notification of another user", async () => {
    const notification = makeNotification({
      recipientId: new UniqueEntityID('recipient-1'),
    })
    await repository.create(notification)

    const result = await sut.handle({
      notificationId: notification.id.toString(),
      recipientId: 'recipient-2',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
