import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/error/errors/not-allowed-error'
import { makeQuestion } from 'test/factories/make-question'
import { makeQuestionAttachment } from 'test/factories/make-question-attachment'
import { InMemoryQuestionAttachmentRepository } from 'test/repositories/in-memory-question-attachments.repository'
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question.repository'
import { EditQuestionUseCase } from './edit-question.service'

let questionRepository: InMemoryQuestionRepository
let questionAttachmentRepository: InMemoryQuestionAttachmentRepository
let sut: EditQuestionUseCase

describe('@use-cases/edit-question', () => {
  beforeEach(() => {
    questionAttachmentRepository = new InMemoryQuestionAttachmentRepository()
    questionRepository = new InMemoryQuestionRepository(
      questionAttachmentRepository,
    )
    sut = new EditQuestionUseCase(
      questionRepository,
      questionAttachmentRepository,
    )
  })

  it('should be able to edit a question', async () => {
    const createdQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-id'),
      },
      new UniqueEntityID('example-id'),
    )

    await questionRepository.create(createdQuestion)

    questionAttachmentRepository.items.push(
      makeQuestionAttachment({
        attachmentId: new UniqueEntityID('1'),
        questionId: createdQuestion.id,
      }),
      makeQuestionAttachment({
        attachmentId: new UniqueEntityID('2'),
        questionId: createdQuestion.id,
      }),
    )

    const result = await sut.handle({
      authorId: 'author-id',
      questionId: 'example-id',
      content: 'content-example',
      attachmentsId: ['1', '4', '5'],
    })

    expect(result.isRight()).toBe(true)
    expect(questionRepository.items[0]).toMatchObject({
      content: 'content-example',
    })

    if (result.isLeft()) return

    expect(result.value.question.attachments.currentItems).toHaveLength(3)
    expect(result.value.question.attachments.currentItems).toEqual([
      expect.objectContaining({
        attachmentId: new UniqueEntityID('1'),
      }),
      expect.objectContaining({
        attachmentId: new UniqueEntityID('4'),
      }),
      expect.objectContaining({
        attachmentId: new UniqueEntityID('5'),
      }),
    ])
  })

  it('should not be able to edit a question created by another user', async () => {
    const createdQuestion = makeQuestion({}, new UniqueEntityID('example-id'))

    await questionRepository.create(createdQuestion)

    const result = await sut.handle({
      authorId: 'invalid-id',
      questionId: 'example-id',
      content: 'content-example',
      attachmentsId: [],
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
