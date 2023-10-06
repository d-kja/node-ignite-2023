import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question.repository'
import { Slug } from '../../enterprise/entities/value-object/slug'
import { QuestionRepository } from '../repositories/question.repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug.service'

let repository: QuestionRepository
let sut: GetQuestionBySlugUseCase

describe('@use-cases/get-question-by-slug', () => {
  beforeEach(() => {
    repository = new InMemoryQuestionRepository()
    sut = new GetQuestionBySlugUseCase(repository)
  })

  it("should be able to get a question using it's slug", async () => {
    const createdQuestion = makeQuestion({
      slug: Slug.create('some-odd-title'),
    })

    await repository.create(createdQuestion)

    const result = await sut.handle({
      slug: 'some-odd-title',
    })

    expect(result.isRight()).toBeTruthy()
    if (result.isRight())
      expect(result.value.question.id).toEqual(createdQuestion.id)
  })
})
