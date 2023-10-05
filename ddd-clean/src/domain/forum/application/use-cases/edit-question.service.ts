import { Question } from '../../enterprise/entities/question.entity'
import { QuestionRepository } from '../repositories/question.repository'

interface EditQuestionUseCaseRequest {
  authorId: string
  questionId: string
  title?: string
  content: string
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface EditQuestionUseCaseResponse {
  question: Question
}

export class EditQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async handle({
    authorId,
    questionId,
    title,
    content,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      throw new Error('Resource not found.')
    }

    if (question.authorId.toString() !== authorId) {
      throw new Error('Unauthorized')
    }

    question.title = title ?? question.title
    question.content = content

    await this.questionRepository.save(question)

    return { question }
  }
}
