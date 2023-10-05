import { AnswerCommentsRepository } from '../repositories/answer-comment.repository'

interface DeleteCommentAnswerUseCaseRequest {
  authorId: string
  answerCommentId: string
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DeleteCommentAnswerUseCaseResponse {}

export class DeleteCommentAnswerUseCase {
  constructor(private answerCommentRepository: AnswerCommentsRepository) {}

  async handle({
    authorId,
    answerCommentId,
  }: DeleteCommentAnswerUseCaseRequest): Promise<DeleteCommentAnswerUseCaseResponse> {
    const answerComment =
      await this.answerCommentRepository.findById(answerCommentId)

    if (!answerComment) {
      throw new Error('Resource not found.')
    }

    if (answerComment.authorId.toString() !== authorId) {
      throw new Error('Unauthorized')
    }

    await this.answerCommentRepository.delete(answerComment)

    return {}
  }
}
