import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { InMemoryAnswerCommentRepository } from 'test/repositories/in-memory-answer-comment.repository'
import { ListAnswerCommentsUseCase } from './list-answer-comments.service'

let repository: InMemoryAnswerCommentRepository
let sut: ListAnswerCommentsUseCase

describe('@use-case/list-answer-answers', async () => {
  beforeEach(() => {
    repository = new InMemoryAnswerCommentRepository()
    sut = new ListAnswerCommentsUseCase(repository)
  })

  it('should be able to list answer answers', async () => {
    await repository.create(
      makeAnswerComment({ answerId: new UniqueEntityID('answer-id') }),
    )
    await repository.create(
      makeAnswerComment({ answerId: new UniqueEntityID('answer-id') }),
    )
    await repository.create(
      makeAnswerComment({ answerId: new UniqueEntityID('answer-id') }),
    )

    const { answerComments } = await sut.handle({
      answerId: 'answer-id',
      page: 1,
    })

    expect(answerComments).toHaveLength(3)
  })

  it('should have paginated results', async () => {
    for (let i = 1; i <= 22; i++) {
      await repository.create(
        makeAnswerComment({ answerId: new UniqueEntityID('answer-id') }),
      )
    }

    const { answerComments } = await sut.handle({
      answerId: 'answer-id',
      page: 2,
    })

    expect(answerComments).toHaveLength(2)
  })
})
