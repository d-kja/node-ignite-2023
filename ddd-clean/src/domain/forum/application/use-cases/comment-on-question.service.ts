import { Either, left, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/core/error/errors/resource-not-found-error'
import { QuestionComment } from '../../enterprise/entities/question-comment.entity'
import { QuestionCommentsRepository } from '../repositories/question-comment.repository'
import { QuestionRepository } from '../repositories/question.repository'

interface CommentOnQuestionRequest {
  questionId: string
  authorId: string
  content: string
}

type CommentOnQuestionResponse = Either<
  ResourceNotFoundError,
  {
    questionComment: QuestionComment
  }
>

export class CommentOnQuestionUseCase {
  constructor(
    private questionRepository: QuestionRepository,
    private questionCommentRepository: QuestionCommentsRepository,
  ) {}

  async handle({
    questionId,
    authorId,
    content,
  }: CommentOnQuestionRequest): Promise<CommentOnQuestionResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    const questionComment = QuestionComment.create({
      questionId: new UniqueEntityID(questionId),
      authorId: new UniqueEntityID(authorId),
      content,
    })

    this.questionCommentRepository.create(questionComment)

    return right({
      questionComment,
    })
  }
}
