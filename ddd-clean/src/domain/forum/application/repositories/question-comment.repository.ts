import { PaginatedRequest } from '@/core/repositories/paginated-request'
import { QuestionComment } from '../../enterprise/entities/question-comment.entity'

export interface QuestionCommentsRepository {
  findById(id: string): Promise<QuestionComment | null>
  findManyByQuestionId(
    questionId: string,
    params: PaginatedRequest,
  ): Promise<QuestionComment[]>
  create(question: QuestionComment): Promise<void>
  delete(question: QuestionComment): Promise<void>
}
