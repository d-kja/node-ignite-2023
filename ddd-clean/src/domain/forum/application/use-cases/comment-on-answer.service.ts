import { Either, left, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/core/error/errors/resource-not-found-error'
import { AnswerComment } from '../../enterprise/entities/answer-comment.entity'
import { AnswerCommentsRepository } from '../repositories/answer-comment.repository'
import { AnswerRepository } from '../repositories/answer.repository'

interface CommentOnAnswerRequest {
  answerId: string
  authorId: string
  content: string
}

type CommentOnAnswerResponse = Either<
  ResourceNotFoundError,
  {
    answerComment: AnswerComment
  }
>

export class CommentOnAnswerUseCase {
  constructor(
    private answerRepository: AnswerRepository,
    private answerCommentRepository: AnswerCommentsRepository,
  ) {}

  async handle({
    answerId,
    authorId,
    content,
  }: CommentOnAnswerRequest): Promise<CommentOnAnswerResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    const answerComment = AnswerComment.create({
      answerId: new UniqueEntityID(answerId),
      authorId: new UniqueEntityID(authorId),
      content,
    })

    this.answerCommentRepository.create(answerComment)

    return right({
      answerComment,
    })
  }
}
