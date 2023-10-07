import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/error/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/error/errors/resource-not-found-error'
import { Question } from '../../enterprise/entities/question.entity'
import { AnswerRepository } from '../repositories/answer.repository'
import { QuestionRepository } from '../repositories/question.repository'

interface ChooseBestAnswerRequest {
  answerId: string
  authorId: string
}

type ChooseBestAnswerResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    question: Question
  }
>

export class ChooseBestAnswerUseCase {
  constructor(
    private answerRepository: AnswerRepository,
    private questionRepository: QuestionRepository,
  ) {}

  async handle({
    answerId,
    authorId,
  }: ChooseBestAnswerRequest): Promise<ChooseBestAnswerResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    const question = await this.questionRepository.findById(
      answer.questionId.toString(),
    )

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (question.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    question.bestAnswerId = answer.id

    this.questionRepository.save(question)

    return right({
      question,
    })
  }
}
