import { PaginatedRequest } from '@/core/repositories/paginated-request'
import { Answer } from '../../enterprise/entities/answer.entity'

export interface AnswerRepository {
  create(answer: Answer): Promise<void>
  save(answer: Answer): Promise<void>
  delete(answer: Answer): Promise<void>
  findById(id: string): Promise<Answer | null>
  findManyByQuestionId(id: string, params: PaginatedRequest): Promise<Answer[]>
}
