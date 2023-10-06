import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { InMemoryAnswerCommentRepository } from 'test/repositories/in-memory-answer-comment.repository'
import { DeleteCommentAnswerUseCase } from './delete-answer-comment.service'
import { NotAllowedError } from './errors/not-allowed-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let repository: InMemoryAnswerCommentRepository
let sut: DeleteCommentAnswerUseCase

describe('@use-cases/delete-answer-comment', () => {
  beforeEach(() => {
    repository = new InMemoryAnswerCommentRepository()
    sut = new DeleteCommentAnswerUseCase(repository)
  })

  it('should be able to delete a answer comment', async () => {
    const createdAnswer = makeAnswerComment(
      {
        authorId: new UniqueEntityID('author-id'),
      },
      new UniqueEntityID('example-id'),
    )

    await repository.create(createdAnswer)

    await sut.handle({ authorId: 'author-id', answerCommentId: 'example-id' })

    expect(repository.items).toHaveLength(0)
  })

  it('should not be able to delete a answer comment created by another user', async () => {
    const createdAnswerComment = makeAnswerComment(
      {},
      new UniqueEntityID('example-id'),
    )

    await repository.create(createdAnswerComment)

    const result = await sut.handle({
      authorId: 'invalid-id',
      answerCommentId: 'example-id',
    })

    expect(result.isLeft()).toEqual(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })

  it("should not be able to delete a comment that doesn't exist", async () => {
    const result = await sut.handle({
      authorId: '',
      answerCommentId: 'invalid-id',
    })

    expect(result.isLeft()).toEqual(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
