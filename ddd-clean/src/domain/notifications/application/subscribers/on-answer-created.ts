import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { QuestionRepository } from '@/domain/forum/application/repositories/question.repository'
import { AnswerCreatedEvent } from '@/domain/forum/enterprise/events/answer-created.event'
import { SendNotificationUseCase } from '../use-cases/send-notification.service'

export class OnAnswerCreated implements EventHandler {
  constructor(
    private questionsRepository: QuestionRepository,
    private sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendAnswerNotificationHandler.bind(this),
      AnswerCreatedEvent.name,
    )
  }

  private async sendAnswerNotificationHandler({ entity }: AnswerCreatedEvent) {
    const question = await this.questionsRepository.findById(
      entity.questionId.toString(),
    )

    if (question)
      this.sendNotification.handle({
        recipientId: question.authorId.toString(),
        content: question.excerpt,
        title: `Nova resposta no  ${question.title
          .substring(0, 40)
          .trimEnd()
          .concat('...')}`,
      })
  }
}
