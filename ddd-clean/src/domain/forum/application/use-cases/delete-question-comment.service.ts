import { Either, left, right } from '@/core/either'
import { QuestionCommentsRepository } from '../repositories/question-comment.repository'
import { NotAllowedError } from './errors/not-allowed-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface DeleteCommentQuestionUseCaseRequest {
  authorId: string
  questionCommentId: string
}

type DeleteCommentQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  Record<string, unknown>
>

export class DeleteCommentQuestionUseCase {
  constructor(private questionCommentRepository: QuestionCommentsRepository) {}

  async handle({
    authorId,
    questionCommentId,
  }: DeleteCommentQuestionUseCaseRequest): Promise<DeleteCommentQuestionUseCaseResponse> {
    const questionComment =
      await this.questionCommentRepository.findById(questionCommentId)

    if (!questionComment) {
      return left(new ResourceNotFoundError())
    }

    if (questionComment.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    await this.questionCommentRepository.delete(questionComment)

    return right({})
  }
}
