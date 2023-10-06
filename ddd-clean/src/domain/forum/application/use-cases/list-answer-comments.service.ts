import { Either, right } from '@/core/either'
import { AnswerComment } from '../../enterprise/entities/answer-comment.entity'
import { AnswerCommentsRepository } from '../repositories/answer-comment.repository'

interface ListAnswerCommentsRequest {
  answerId: string
  page: number
}

type ListAnswerCommentsResponse = Either<
  null,
  { answerComments: AnswerComment[] }
>

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

    return right({ answerComments })
  }
}
