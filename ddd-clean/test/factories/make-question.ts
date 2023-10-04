import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Question,
  QuestionConstructor,
} from '@/domain/forum/enterprise/entities/question.entity'

import { faker } from '@faker-js/faker'

export const makeQuestion = (
  override: Partial<QuestionConstructor> = {},
  id?: UniqueEntityID,
) => {
  const question = Question.create(
    {
      authorId: new UniqueEntityID(),
      title: faker.lorem.sentence(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return question
}
