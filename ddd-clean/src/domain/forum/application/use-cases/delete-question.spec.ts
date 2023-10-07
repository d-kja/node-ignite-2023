import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeQuestion } from 'test/factories/make-question'
import { makeQuestionAttachment } from 'test/factories/make-question-attachment'
import { InMemoryQuestionAttachmentRepository } from 'test/repositories/in-memory-question-attachments.repository'
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question.repository'
import { DeleteQuestionUseCase } from './delete-question.service'
import { NotAllowedError } from './errors/not-allowed-error'

let repository: InMemoryQuestionRepository
let questionAttachmentRepository: InMemoryQuestionAttachmentRepository

let sut: DeleteQuestionUseCase

describe('@use-cases/delete-question', () => {
  beforeEach(() => {
    questionAttachmentRepository = new InMemoryQuestionAttachmentRepository()
    repository = new InMemoryQuestionRepository(questionAttachmentRepository)
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

    await sut.handle({ authorId: 'author-id', questionId: 'example-id' })

    expect(repository.items).toHaveLength(0)
    expect(questionAttachmentRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a question created by another user', async () => {
    const createdQuestion = makeQuestion({}, new UniqueEntityID('example-id'))

    await repository.create(createdQuestion)

    const result = await sut.handle({
      authorId: 'invalid-id',
      questionId: 'example-id',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
