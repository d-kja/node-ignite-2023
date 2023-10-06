import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface QuestionAttachmentConstructor {
  attachmentId: UniqueEntityID
  questionId: UniqueEntityID
}

export class QuestionAttachment extends Entity<QuestionAttachmentConstructor> {
  get questionId() {
    return this.props.questionId
  }

  get attachmentId() {
    return this.props.attachmentId
  }

  static create(props: QuestionAttachmentConstructor, id?: UniqueEntityID) {
    return new QuestionAttachment(props, id)
  }
}
