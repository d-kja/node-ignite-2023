import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswerRepository } from '@/domain/forum/application/repositories/answer.repository'
import { InMemoryAnswerAttachmentRepository } from 'test/repositories/in-memory-answer-attachments.repository'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer.repository'
import { AnswerQuestionUseCase } from './answer-question.service'

let attachmentRepository: InMemoryAnswerAttachmentRepository
let repository: AnswerRepository
let sut: AnswerQuestionUseCase

describe('@use-cases/answer-question', () => {
  beforeEach(() => {
    attachmentRepository = new InMemoryAnswerAttachmentRepository()
    repository = new InMemoryAnswerRepository(attachmentRepository)
    sut = new AnswerQuestionUseCase(repository)
  })

  it('should be able to answer a question', async () => {
    const result = await sut.handle({
      questionId: '0',
      authorId: '0',
      content: 'lorem ipsum...',
      attachmentsId: ['1', '2'],
    })

    if (!result.isRight()) throw new Error('invalid test')

    expect(result.isRight()).toEqual(true)

    expect(result.value.answer.attachments.currentItems).toHaveLength(2)
    expect(result.value.answer.attachments.currentItems).toEqual([
      expect.objectContaining({
        attachmentId: new UniqueEntityID('1'),
      }),
      expect.objectContaining({
        attachmentId: new UniqueEntityID('2'),
      }),
    ])
  })
})
