import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Answer } from '../entities/answer.entity'
import { AnswerRepository } from '../repositories/answer.repository'

interface AnswerQuestionRequest {
  authorId: string
  questionId: string
  content: string
}

export class AnswerQuestionUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async handle({ questionId, authorId, content }: AnswerQuestionRequest) {
    const answer = Answer.create({
      questionId: new UniqueEntityID(questionId),
      authorId: new UniqueEntityID(authorId),
      content,
    })

    await this.answerRepository.create(answer)

    return answer
  }
}
