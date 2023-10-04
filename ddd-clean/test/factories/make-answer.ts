import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Answer,
  AnswerConstructor,
} from '@/domain/forum/enterprise/entities/answer.entity'

import { faker } from '@faker-js/faker'

export const makeAnswer = (
  override: Partial<AnswerConstructor> = {},
  id?: UniqueEntityID,
) => {
  const answer = Answer.create(
    {
      authorId: new UniqueEntityID(),
      questionId: new UniqueEntityID(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return answer
}
