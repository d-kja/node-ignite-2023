import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments.repository'
import { QuestionRepository } from '@/domain/forum/application/repositories/question.repository'
import { makeAnswer } from 'test/factories/make-answer'
import { makeQuestion } from 'test/factories/make-question'
import { InMemoryAnswerAttachmentRepository } from 'test/repositories/in-memory-answer-attachments.repository'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer.repository'
import { InMemoryNotificationRepository } from 'test/repositories/in-memory-notification.repository'
import { InMemoryQuestionAttachmentRepository } from 'test/repositories/in-memory-question-attachments.repository'
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question.repository'
import { SpyInstance } from 'vitest'
import { NotificationRepository } from '../repositories/notifications-repository'
import {
  SendNotificationUseCase,
  SendNotificationUseCaseRequest,
  SendNotificationUseCaseResponse,
} from '../use-cases/send-notification.service'
import { OnBestAnswerChosen } from './on-best-answer-chosen'

let attachmentRepository: InMemoryAnswerAttachmentRepository
let answerRepository: InMemoryAnswerRepository

let notificationRepository: NotificationRepository
let sendNotification: SendNotificationUseCase

let questionAttachmentRepository: QuestionAttachmentsRepository
let questionRepository: QuestionRepository

let sendNotificationSpy: SpyInstance<
  [SendNotificationUseCaseRequest],
  Promise<SendNotificationUseCaseResponse>
>

describe('@pub-sub/on-best-answer-chosen', async () => {
  beforeEach(() => {
    attachmentRepository = new InMemoryAnswerAttachmentRepository()
    answerRepository = new InMemoryAnswerRepository(attachmentRepository)

    notificationRepository = new InMemoryNotificationRepository()
    sendNotification = new SendNotificationUseCase(notificationRepository)

    questionAttachmentRepository = new InMemoryQuestionAttachmentRepository()
    questionRepository = new InMemoryQuestionRepository(
      questionAttachmentRepository,
    )

    sendNotificationSpy = vi.spyOn(sendNotification, 'handle')
  })

  it('should be able to send a notification', async () => {
    // Register subscriber
    const _ = new OnBestAnswerChosen(answerRepository, sendNotification) // eslint-disable-line

    const question = makeQuestion()
    await questionRepository.create(question)

    // Create new answer
    const answer = makeAnswer({
      questionId: question.id,
    })
    await answerRepository.create(answer)

    // Persist data
    question.bestAnswerId = answer.id
    await questionRepository.save(question)

    expect(sendNotificationSpy).toHaveBeenCalled()
  })
})
