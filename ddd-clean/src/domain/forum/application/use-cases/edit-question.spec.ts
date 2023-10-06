import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question.repository'
import { EditQuestionUseCase } from './edit-question.service'
import { NotAllowedError } from './errors/not-allowed-error'

let repository: InMemoryQuestionRepository
let sut: EditQuestionUseCase

describe('@use-cases/edit-question', () => {
  beforeEach(() => {
    repository = new InMemoryQuestionRepository()
    sut = new EditQuestionUseCase(repository)
  })

  it('should be able to edit a question', async () => {
    const createdQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-id'),
      },
      new UniqueEntityID('example-id'),
    )

    await repository.create(createdQuestion)

    const result = await sut.handle({
      authorId: 'author-id',
      questionId: 'example-id',
      content: 'content-example',
    })

    expect(result.isRight()).toBe(true)
    expect(repository.items[0]).toMatchObject({
      content: 'content-example',
    })
  })

  it('should not be able to edit a question created by another user', async () => {
    const createdQuestion = makeQuestion({}, new UniqueEntityID('example-id'))

    await repository.create(createdQuestion)

    const result = await sut.handle({
      authorId: 'invalid-id',
      questionId: 'example-id',
      content: 'content-example',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
