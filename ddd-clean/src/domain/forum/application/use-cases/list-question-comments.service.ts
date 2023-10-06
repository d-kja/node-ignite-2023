import { Either, right } from '@/core/either'
import { QuestionComment } from '../../enterprise/entities/question-comment.entity'
import { QuestionCommentsRepository } from '../repositories/question-comment.repository'

interface ListQuestionCommentsRequest {
  questionId: string
  page: number
}

type ListQuestionCommentsResponse = Either<
  null,
  { questionComments: QuestionComment[] }
>

export class ListQuestionCommentsUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async handle({
    questionId,

    page,
  }: ListQuestionCommentsRequest): Promise<ListQuestionCommentsResponse> {
    const questionComments =
      await this.questionCommentsRepository.findManyByQuestionId(questionId, {
        page,
      })

    return right({ questionComments })
  }
}
