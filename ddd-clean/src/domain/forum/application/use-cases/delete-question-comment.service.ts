import { QuestionCommentsRepository } from '../repositories/question-comment.repository'

interface DeleteCommentQuestionUseCaseRequest {
  authorId: string
  questionCommentId: string
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DeleteCommentQuestionUseCaseResponse {}

export class DeleteCommentQuestionUseCase {
  constructor(private questionCommentRepository: QuestionCommentsRepository) {}

  async handle({
    authorId,
    questionCommentId,
  }: DeleteCommentQuestionUseCaseRequest): Promise<DeleteCommentQuestionUseCaseResponse> {
    const questionComment =
      await this.questionCommentRepository.findById(questionCommentId)

    if (!questionComment) {
      throw new Error('Resource not found.')
    }

    if (questionComment.authorId.toString() !== authorId) {
      throw new Error('Unauthorized')
    }

    await this.questionCommentRepository.delete(questionComment)

    return {}
  }
}
