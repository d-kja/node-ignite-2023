import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  QuestionComment,
  QuestionCommentConstructor,
} from '@/domain/forum/enterprise/entities/question-comment.entity'

import { faker } from '@faker-js/faker'

export const makeQuestionComment = (
  override: Partial<QuestionCommentConstructor> = {},
  id?: UniqueEntityID,
) => {
  const questionComment = QuestionComment.create(
    {
      authorId: new UniqueEntityID(),
      questionId: new UniqueEntityID(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return questionComment
}
