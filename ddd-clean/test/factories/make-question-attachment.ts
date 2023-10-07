import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  QuestionAttachment,
  QuestionAttachmentConstructor,
} from '@/domain/forum/enterprise/entities/question-attachment.entity'

export const makeQuestionAttachment = (
  override: Partial<QuestionAttachmentConstructor> = {},
  id?: UniqueEntityID,
) => {
  const questionAttachment = QuestionAttachment.create(
    {
      attachmentId: new UniqueEntityID(),
      questionId: new UniqueEntityID(),
      ...override,
    },
    id,
  )

  return questionAttachment
}
