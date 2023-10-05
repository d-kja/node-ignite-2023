import { PaginatedRequest } from '@/core/repositories/paginated-request'
import { Question } from '../../enterprise/entities/question.entity'

export interface QuestionRepository {
  create(question: Question): Promise<void>
  save(question: Question): Promise<void>
  delete(question: Question): Promise<void>
  findById(id: string): Promise<Question | null>
  findBySlug(slug: string): Promise<Question | null>
  findManyOrderByDate(params: PaginatedRequest): Promise<Question[]>
}
