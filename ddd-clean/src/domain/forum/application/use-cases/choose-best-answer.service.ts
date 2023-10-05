import { Question } from '../../enterprise/entities/question.entity'
import { AnswerRepository } from '../repositories/answer.repository'
import { QuestionRepository } from '../repositories/question.repository'

interface ChooseBestAnswerRequest {
  answerId: string
  authorId: string
}
interface ChooseBestAnswerResponse {
  question: Question
}

export class ChooseBestAnswerUseCase {
  constructor(
    private answerRepository: AnswerRepository,
    private questionRepository: QuestionRepository,
  ) {}

  async handle({
    answerId,
    authorId,
  }: ChooseBestAnswerRequest): Promise<ChooseBestAnswerResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      throw new Error('Resource not found.')
    }

    const question = await this.questionRepository.findById(
      answer.questionId.toString(),
    )

    if (!question) {
      throw new Error('Resource not found.')
    }

    if (question.authorId.toString() !== authorId) {
      throw new Error('Unauthorized.')
    }

    question.bestAnswerId = answer.id

    this.questionRepository.save(question)

    return {
      question,
    }
  }
}
