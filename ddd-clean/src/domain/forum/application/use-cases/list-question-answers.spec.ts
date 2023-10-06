import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer.repository'
import { ListQuestionAnswersUseCase } from './list-question-answers.service'

let repository: InMemoryAnswerRepository
let sut: ListQuestionAnswersUseCase

describe('@use-case/list-question-answers', async () => {
  beforeEach(() => {
    repository = new InMemoryAnswerRepository()
    sut = new ListQuestionAnswersUseCase(repository)
  })

  it('should be able to list question answers', async () => {
    await repository.create(
      makeAnswer({ questionId: new UniqueEntityID('question-id') }),
    )
    await repository.create(
      makeAnswer({ questionId: new UniqueEntityID('question-id') }),
    )
    await repository.create(
      makeAnswer({ questionId: new UniqueEntityID('question-id') }),
    )

    const result = await sut.handle({
      questionId: 'question-id',
      page: 1,
    })

    expect(result.isRight()).toBeTruthy()
    if (result.isRight()) expect(result.value.answers).toHaveLength(3)
  })

  it('should have paginated results', async () => {
    for (let i = 1; i <= 22; i++) {
      await repository.create(
        makeAnswer({ questionId: new UniqueEntityID('question-id') }),
      )
    }

    const result = await sut.handle({
      questionId: 'question-id',
      page: 2,
    })

    expect(result.isRight()).toBeTruthy()
    if (result.isRight()) expect(result.value.answers).toHaveLength(2)
  })
})
