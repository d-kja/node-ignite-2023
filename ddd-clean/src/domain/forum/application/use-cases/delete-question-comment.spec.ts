import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/error/errors/not-allowed-error'
import { makeQuestionComment } from 'test/factories/make-question-comment'
import { InMemoryQuestionCommentRepository } from 'test/repositories/in-memory-question-comment.repository'
import { DeleteCommentQuestionUseCase } from './delete-question-comment.service'

let repository: InMemoryQuestionCommentRepository
let sut: DeleteCommentQuestionUseCase

describe('@use-cases/delete-question-comment', () => {
  beforeEach(() => {
    repository = new InMemoryQuestionCommentRepository()
    sut = new DeleteCommentQuestionUseCase(repository)
  })

  it('should be able to delete a question comment', async () => {
    const createdQuestion = makeQuestionComment(
      {
        authorId: new UniqueEntityID('author-id'),
      },
      new UniqueEntityID('example-id'),
    )

    await repository.create(createdQuestion)

    await sut.handle({ authorId: 'author-id', questionCommentId: 'example-id' })

    expect(repository.items).toHaveLength(0)
  })

  it('should not be able to delete a question comment created by another user', async () => {
    const createdQuestionComment = makeQuestionComment(
      {},
      new UniqueEntityID('example-id'),
    )

    await repository.create(createdQuestionComment)

    const result = await sut.handle({
      authorId: 'invalid-id',
      questionCommentId: 'example-id',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
