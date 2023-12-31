import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryQuestionAttachmentRepository } from 'test/repositories/in-memory-question-attachments.repository'
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question.repository'
import { QuestionRepository } from '../repositories/question.repository'
import { CreateQuestionUseCase } from './create-question.service'

let attachmentRepository: InMemoryQuestionAttachmentRepository
let repository: QuestionRepository
let sut: CreateQuestionUseCase

describe('@use-cases/create-question', () => {
  beforeEach(() => {
    attachmentRepository = new InMemoryQuestionAttachmentRepository()
    repository = new InMemoryQuestionRepository(attachmentRepository)
    sut = new CreateQuestionUseCase(repository)
  })

  it('should be able to create a question', async () => {
    const result = await sut.handle({
      authorId: 'example-id',
      title: 'Some odd title',
      content: 'example-content',
      attachmentsId: ['1', '2'],
    })

    if (!result.isRight()) throw new Error('invalid test')

    expect(result.isRight()).toBeTruthy()
    expect(result.value.question.slug.value).toEqual('some-odd-title')
    expect(result.value.question.attachments.currentItems).toHaveLength(2)
    expect(result.value.question.attachments.currentItems).toEqual([
      expect.objectContaining({
        attachmentId: new UniqueEntityID('1'),
      }),
      expect.objectContaining({
        attachmentId: new UniqueEntityID('2'),
      }),
    ])
  })
})
