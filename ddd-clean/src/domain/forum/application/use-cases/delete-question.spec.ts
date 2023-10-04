import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question.repository'
import { DeleteQuestionUseCase } from './delete-question.service'

let repository: InMemoryQuestionRepository
let sut: DeleteQuestionUseCase

describe('@use-cases/delete-question', () => {
  beforeEach(() => {
    repository = new InMemoryQuestionRepository()
    sut = new DeleteQuestionUseCase(repository)
  })

  it('should be able to delete a question', async () => {
    const createdQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-id'),
      },
      new UniqueEntityID('example-id'),
    )

    await repository.create(createdQuestion)

    await sut.handle({ authorId: 'author-id', questionId: 'example-id' })

    expect(repository.items).toHaveLength(0)
  })

  it('should not be able to delete a question created by another user', async () => {
    const createdQuestion = makeQuestion({}, new UniqueEntityID('example-id'))

    await repository.create(createdQuestion)

    await expect(() =>
      sut.handle({ authorId: 'invalid-id', questionId: 'example-id' }),
    ).rejects.toBeInstanceOf(Error)
  })
})
