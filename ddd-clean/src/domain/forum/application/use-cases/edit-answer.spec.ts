import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/error/errors/not-allowed-error'
import { makeAnswer } from 'test/factories/make-answer'
import { makeAnswerAttachment } from 'test/factories/make-answer-attachment'
import { InMemoryAnswerAttachmentRepository } from 'test/repositories/in-memory-answer-attachments.repository'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer.repository'
import { EditAnswerUseCase } from './edit-answer.service'

let attachmentRepository: InMemoryAnswerAttachmentRepository
let repository: InMemoryAnswerRepository
let sut: EditAnswerUseCase

describe('@use-cases/edit-answer', () => {
  beforeEach(() => {
    attachmentRepository = new InMemoryAnswerAttachmentRepository()
    repository = new InMemoryAnswerRepository(attachmentRepository)
    sut = new EditAnswerUseCase(repository, attachmentRepository)
  })

  it('should be able to edit a answer', async () => {
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
      content: 'content-example',
      attachmentsId: ['1', '3', '5'],
    })

    expect(result.isRight()).toBeTruthy()
    expect(repository.items[0]).toMatchObject({
      content: 'content-example',
    })

    if (result.isLeft()) return

    expect(result.value.answer.attachments.currentItems).toHaveLength(3)
    expect(result.value.answer.attachments.currentItems).toEqual([
      expect.objectContaining({
        attachmentId: new UniqueEntityID('1'),
      }),
      expect.objectContaining({
        attachmentId: new UniqueEntityID('3'),
      }),
      expect.objectContaining({
        attachmentId: new UniqueEntityID('5'),
      }),
    ])
  })

  it('should not be able to edit a answer created by another user', async () => {
    const createdAnswer = makeAnswer({}, new UniqueEntityID('example-id'))

    await repository.create(createdAnswer)

    const result = await sut.handle({
      authorId: 'invalid-id',
      answerId: 'example-id',
      content: 'content-example',
      attachmentsId: [],
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
