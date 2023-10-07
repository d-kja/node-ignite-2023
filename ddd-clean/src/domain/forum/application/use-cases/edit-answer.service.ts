import { Either, left, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswerAttachmentList } from '../../enterprise/entities/answer-attachment-list.entity'
import { AnswerAttachment } from '../../enterprise/entities/answer-attachment.entity'
import { Answer } from '../../enterprise/entities/answer.entity'
import { AnswerAttachmentsRepository } from '../repositories/answer-attachments.repository'
import { AnswerRepository } from '../repositories/answer.repository'
import { NotAllowedError } from './errors/not-allowed-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface EditAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
  attachmentsId: string[]
}

type EditAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    answer: Answer
  }
>

export class EditAnswerUseCase {
  constructor(
    private answerRepository: AnswerRepository,
    private answerAttachmentsRepository: AnswerAttachmentsRepository,
  ) {}

  async handle({
    authorId,
    answerId,
    content,
    attachmentsId,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    if (answer.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    const currentAnswerAttachments =
      await this.answerAttachmentsRepository.findManyByAnswerId(answerId)

    const AnswerAttachmentsList = new AnswerAttachmentList(
      currentAnswerAttachments,
    )

    const attachments = attachmentsId.map((attachmentId) =>
      AnswerAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        answerId: answer.id,
      }),
    )

    AnswerAttachmentsList.update(attachments)

    answer.attachments = AnswerAttachmentsList
    answer.content = content

    await this.answerRepository.save(answer)

    return right({
      answer,
    })
  }
}
