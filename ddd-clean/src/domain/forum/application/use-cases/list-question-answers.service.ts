import { Either, right } from '@/core/either'
import { Answer } from '../../enterprise/entities/answer.entity'
import { AnswerRepository } from '../repositories/answer.repository'

interface ListQuestionAnswersRequest {
  questionId: string
  page: number
}

type ListQuestionAnswersResponse = Either<
  null,
  {
    answers: Answer[]
  }
>

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

    return right({ answers })
  }
}
