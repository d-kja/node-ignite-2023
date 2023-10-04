import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question.repository'
import { QuestionRepository } from '../repositories/question.repository'
import { CreateQuestionUseCase } from './create-question.service'

let repository: QuestionRepository
let sut: CreateQuestionUseCase

describe('@use-cases/create-question', () => {
  beforeEach(() => {
    repository = new InMemoryQuestionRepository()
    sut = new CreateQuestionUseCase(repository)
  })

  it('should be able to create a question', async () => {
    const { question } = await sut.handle({
      authorId: 'example-id',
      title: 'Some odd title',
      content: 'example-content',
    })

    expect(question.id).toBeTruthy()
    expect(question.slug.value).toEqual('some-odd-title')
  })
})
