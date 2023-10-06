import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer.repository'
import { EditAnswerUseCase } from './edit-answer.service'
import { NotAllowedError } from './errors/not-allowed-error'

let repository: InMemoryAnswerRepository
let sut: EditAnswerUseCase

describe('@use-cases/edit-answer', () => {
  beforeEach(() => {
    repository = new InMemoryAnswerRepository()
    sut = new EditAnswerUseCase(repository)
  })

  it('should be able to edit a answer', async () => {
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
      content: 'content-example',
    })

    expect(result.isRight()).toBeTruthy()
    expect(repository.items[0]).toMatchObject({
      content: 'content-example',
    })
  })

  it('should not be able to edit a answer created by another user', async () => {
    const createdAnswer = makeAnswer({}, new UniqueEntityID('example-id'))

    await repository.create(createdAnswer)

    const result = await sut.handle({
      authorId: 'invalid-id',
      answerId: 'example-id',
      content: 'content-example',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
