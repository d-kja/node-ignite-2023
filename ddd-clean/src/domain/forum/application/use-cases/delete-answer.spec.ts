import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer.repository'
import { DeleteAnswerUseCase } from './delete-answer.service'
import { NotAllowedError } from './errors/not-allowed-error'

let repository: InMemoryAnswerRepository
let sut: DeleteAnswerUseCase

describe('@use-cases/delete-answer', () => {
  beforeEach(() => {
    repository = new InMemoryAnswerRepository()
    sut = new DeleteAnswerUseCase(repository)
  })

  it('should be able to delete a answer', async () => {
    const createdAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author-id'),
      },
      new UniqueEntityID('example-id'),
    )

    await repository.create(createdAnswer)

    const result = await sut.handle({
      authorId: 'author-id',
      answerId: 'example-id',
    })

    expect(result.isRight()).toBeTruthy()
    expect(repository.items).toHaveLength(0)
  })

  it('should not be able to delete a answer created by another user', async () => {
    const createdAnswer = makeAnswer({}, new UniqueEntityID('example-id'))

    await repository.create(createdAnswer)

    const result = await sut.handle({
      authorId: 'invalid-id',
      answerId: 'example-id',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
