import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { DomainEvent } from '@/core/events/domain-event'
import { Question } from '../entities/question.entity'

export class ChooseBestAnswerForQuestionEvent implements DomainEvent {
  occurredAt: Date
  entity: Question
  answerId: UniqueEntityID

  constructor(entity: Question, answerId: UniqueEntityID) {
    this.entity = entity
    this.answerId = answerId
    this.occurredAt = new Date()
  }

  getAggregateId(): UniqueEntityID {
    return this.entity.id
  }
}
