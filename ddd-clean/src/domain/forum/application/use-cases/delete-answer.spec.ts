import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/error/errors/not-allowed-error'
import { makeAnswer } from 'test/factories/make-answer'
import { makeAnswerAttachment } from 'test/factories/make-answer-attachment'
import { InMemoryAnswerAttachmentRepository } from 'test/repositories/in-memory-answer-attachments.repository'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer.repository'
import { DeleteAnswerUseCase } from './delete-answer.service'

let attachmentRepository: InMemoryAnswerAttachmentRepository
let repository: InMemoryAnswerRepository
let sut: DeleteAnswerUseCase

describe('@use-cases/delete-answer', () => {
  beforeEach(() => {
    attachmentRepository = new InMemoryAnswerAttachmentRepository()
    repository = new InMemoryAnswerRepository(attachmentRepository)
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

    attachmentRepository.items.push(
      makeAnswerAttachment({
        attachmentId: new UniqueEntityID('1'),
        answerId: createdAnswer.id,
      }),
      makeAnswerAttachment({
        attachmentId: new UniqueEntityID('2'),
        answerId: createdAnswer.id,
      }),
    )

    const result = await sut.handle({
      authorId: 'author-id',
      answerId: 'example-id',
    })

    expect(result.isRight()).toBeTruthy()
    expect(repository.items).toHaveLength(0)
    expect(attachmentRepository.items).toHaveLength(0)
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
