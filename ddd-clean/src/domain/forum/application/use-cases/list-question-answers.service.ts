import { Answer } from '../../enterprise/entities/answer.entity'
import { AnswerRepository } from '../repositories/answer.repository'

interface ListQuestionAnswersRequest {
  questionId: string
  page: number
}

interface ListQuestionAnswersResponse {
  answers: Answer[]
}

export class ListQuestionAnswersUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async handle({
    questionId,

    page,
  }: ListQuestionAnswersRequest): Promise<ListQuestionAnswersResponse> {
    const answers = await this.answerRepository.findManyByQuestionId(
      questionId,
      {
        page,
      },
    )

    return { answers }
  }
}
