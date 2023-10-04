import { AnswerRepository } from '../repositories/answer.repository'

interface DeleteAnswerUseCaseRequest {
  authorId: string
  answerId: string
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DeleteAnswerUseCaseResponse {}

export class DeleteAnswerUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async handle({
    authorId,
    answerId,
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      throw new Error('Resource not found.')
    }

    if (answer.authorId.toString() !== authorId) {
      throw new Error('Unauthorized')
    }

    await this.answerRepository.delete(answer)

    return {}
  }
}
