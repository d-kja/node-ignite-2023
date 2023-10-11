import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { AnswerRepository } from '@/domain/forum/application/repositories/answer.repository'
import { ChooseBestAnswerForQuestionEvent } from '@/domain/forum/enterprise/events/choose-best-answer-for-question.event'
import { SendNotificationUseCase } from '../use-cases/send-notification.service'

export class OnBestAnswerChosen implements EventHandler {
  constructor(
    private answerRepository: AnswerRepository,
    private sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.ChooseBestQuestionNotification.bind(this),
      ChooseBestAnswerForQuestionEvent.name,
    )
  }

  private async ChooseBestQuestionNotification({
    entity,
    answerId,
  }: ChooseBestAnswerForQuestionEvent) {
    const answer = await this.answerRepository.findById(answerId.toString())
    if (!answer) return

    this.sendNotification.handle({
      recipientId: answer.authorId.toString(),
      content: entity.excerpt,
      title: `Sua resposta foi escolhida no ${entity.title
        .substring(0, 40)
        .trimEnd()
        .concat('...')}`,
    })
  }
}
