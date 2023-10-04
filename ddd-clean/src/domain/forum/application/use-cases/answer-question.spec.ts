import { AnswerRepository } from '@/domain/forum/application/repositories/answer.repository'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer.respoitory'
import { AnswerQuestionUseCase } from './answer-question.service'

let repository: AnswerRepository
let sut: AnswerQuestionUseCase

describe('@use-cases/answer-question', () => {
  beforeEach(() => {
    repository = new InMemoryAnswerRepository()
    sut = new AnswerQuestionUseCase(repository)
  })

  it('should be able to answer a question', async () => {
    const { answer } = await sut.handle({
      questionId: '0',
      authorId: '0',
      content: 'lorem ipsum...',
    })

    expect(answer.content).toEqual(expect.any(String))
  })
})
