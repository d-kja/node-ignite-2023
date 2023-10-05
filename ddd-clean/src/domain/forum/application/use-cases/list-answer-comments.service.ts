import { AnswerComment } from '../../enterprise/entities/answer-comment.entity'
import { AnswerCommentsRepository } from '../repositories/answer-comment.repository'

interface ListAnswerCommentsRequest {
  answerId: string
  page: number
}

interface ListAnswerCommentsResponse {
  answerComments: AnswerComment[]
}

export class ListAnswerCommentsUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async handle({
    answerId,

    page,
  }: ListAnswerCommentsRequest): Promise<ListAnswerCommentsResponse> {
    const answerComments =
      await this.answerCommentsRepository.findManyByAnswerId(answerId, {
        page,
      })

    return { answerComments }
  }
}
