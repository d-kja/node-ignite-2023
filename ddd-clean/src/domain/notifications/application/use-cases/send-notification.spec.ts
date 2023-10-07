import { InMemoryNotificationRepository } from 'test/repositories/in-memory-notification.repository'
import { SendNotificationUseCase } from './send-notification.service'

let repository: InMemoryNotificationRepository
let sut: SendNotificationUseCase

describe('@use-case/notifications/send-notification', async () => {
  beforeEach(() => {
    repository = new InMemoryNotificationRepository()
    sut = new SendNotificationUseCase(repository)
  })

  it('should be able to send a new notification', async () => {
    const result = await sut.handle({
      title: 'example',
      content: 'example',
      recipientId: 'recipient-id',
    })

    expect(result.isRight()).toBeTruthy()
    expect(repository.items[0]).toEqual(result.value?.notification)
  })
})
