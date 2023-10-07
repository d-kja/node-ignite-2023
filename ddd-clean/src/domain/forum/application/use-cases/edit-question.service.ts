import { Either, left, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { QuestionAttachmentList } from '../../enterprise/entities/question-attachment-list.entity'
import { QuestionAttachment } from '../../enterprise/entities/question-attachment.entity'
import { Question } from '../../enterprise/entities/question.entity'
import { QuestionAttachmentsRepository } from '../repositories/question-attachments.repository'
import { QuestionRepository } from '../repositories/question.repository'
import { NotAllowedError } from './errors/not-allowed-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface EditQuestionUseCaseRequest {
  authorId: string
  questionId: string
  title?: string
  content: string
  attachmentsId: string[]
}

type EditQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    question: Question
  }
>

export class EditQuestionUseCase {
  constructor(
    private questionRepository: QuestionRepository,
    private questionAttachmentsRepository: QuestionAttachmentsRepository,
  ) {}

  async handle({
    authorId,
    questionId,
    title,
    content,
    attachmentsId,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (question.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    const currentQuestionAttachments =
      await this.questionAttachmentsRepository.findManyByQuestionId(questionId)

    const QuestionAttachmentsList = new QuestionAttachmentList(
      currentQuestionAttachments,
    )

    const attachments = attachmentsId.map((attachmentId) =>
      QuestionAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        questionId: question.id,
      }),
    )

    QuestionAttachmentsList.update(attachments)

    question.title = title ?? question.title
    question.content = content
    question.attachments = QuestionAttachmentsList

    await this.questionRepository.save(question)

    return right({ question })
  }
}
