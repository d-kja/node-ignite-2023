import { PaginatedRequest } from '@/core/repositories/paginated-request'
import { AnswerComment } from '../../enterprise/entities/answer-comment.entity'

export interface AnswerCommentsRepository {
  findById(id: string): Promise<AnswerComment | null>
  findManyByAnswerId(
    answerId: string,
    params: PaginatedRequest,
  ): Promise<AnswerComment[]>
  create(answer: AnswerComment): Promise<void>
  delete(answer: AnswerComment): Promise<void>
}
