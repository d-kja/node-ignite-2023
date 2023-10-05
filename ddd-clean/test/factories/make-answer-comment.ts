import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  AnswerComment,
  AnswerCommentConstructor,
} from '@/domain/forum/enterprise/entities/answer-comment.entity'

import { faker } from '@faker-js/faker'

export const makeAnswerComment = (
  override: Partial<AnswerCommentConstructor> = {},
  id?: UniqueEntityID,
) => {
  const answerComment = AnswerComment.create(
    {
      authorId: new UniqueEntityID(),
      answerId: new UniqueEntityID(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return answerComment
}
