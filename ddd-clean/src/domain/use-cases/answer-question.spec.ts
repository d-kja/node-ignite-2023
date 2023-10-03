import { AnswerRepository } from '@/domain/repositories/answer.repository'
import { AnswerQuestionUseCase } from './answer-question.service'

const fakeAnswerRepository: AnswerRepository = {
  async create() {
    return
  },
}

describe('@use-cases/answer-question', () => {
  it('should be able to answer a question', async () => {
    const answerQuestionUseCase = new AnswerQuestionUseCase(
      fakeAnswerRepository,
    )

    const answer = await answerQuestionUseCase.handle({
      questionId: '0',
      authorId: '0',
      content: 'lorem ipsum...',
    })

    expect(answer.content).toEqual(expect.any(String))
  })
})
