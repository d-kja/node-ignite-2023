import { Either, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { QuestionAttachment } from '../../enterprise/entities/question-attachment.entity'
import { Question } from '../../enterprise/entities/question.entity'
import { QuestionRepository } from '../repositories/question.repository'
import { QuestionAttachmentList } from '../../enterprise/entities/question-attachment-list.entity'

interface CreateQuestionUseCaseRequest {
  authorId: string
  title: string
  content: string
  attachmentsId: string[]
}

type CreateQuestionUseCaseResponse = Either<
  null,
  {
    question: Question
  }
>

export class CreateQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async handle({
    authorId,
    title,
    content,
    attachmentsId,
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntityID(authorId),
      title,
      content,
    })

    const attachments = attachmentsId.map((attachmentId) =>
      QuestionAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        questionId: question.id,
      }),
    )

    question.attachments = new QuestionAttachmentList(attachments)

    await this.questionRepository.create(question)

    return right({
      question,
    })
  }
}
