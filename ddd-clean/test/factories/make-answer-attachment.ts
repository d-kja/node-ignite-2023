import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  AnswerAttachment,
  AnswerAttachmentConstructor,
} from '@/domain/forum/enterprise/entities/answer-attachment.entity'

export const makeAnswerAttachment = (
  override: Partial<AnswerAttachmentConstructor> = {},
  id?: UniqueEntityID,
) => {
  const answerAttachment = AnswerAttachment.create(
    {
      attachmentId: new UniqueEntityID(),
      answerId: new UniqueEntityID(),
      ...override,
    },
    id,
  )

  return answerAttachment
}
