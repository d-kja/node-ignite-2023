import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface AnswerAttachmentConstructor {
  attachmentId: UniqueEntityID
  answerId: UniqueEntityID
}

export class AnswerAttachment extends Entity<AnswerAttachmentConstructor> {
  get answerId() {
    return this.props.answerId
  }

  get attachmentId() {
    return this.props.attachmentId
  }

  static create(props: AnswerAttachmentConstructor, id?: UniqueEntityID) {
    return new AnswerAttachment(props, id)
  }
}
