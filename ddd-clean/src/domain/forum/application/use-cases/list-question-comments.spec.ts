import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeQuestionComment } from 'test/factories/make-question-comment'
import { InMemoryQuestionCommentRepository } from 'test/repositories/in-memory-question-comment.repository'
import { ListQuestionCommentsUseCase } from './list-question-comments.service'

let repository: InMemoryQuestionCommentRepository
let sut: ListQuestionCommentsUseCase

describe('@use-case/list-question-answers', async () => {
  beforeEach(() => {
    repository = new InMemoryQuestionCommentRepository()
    sut = new ListQuestionCommentsUseCase(repository)
  })

  it('should be able to list question answers', async () => {
    await repository.create(
      makeQuestionComment({ questionId: new UniqueEntityID('question-id') }),
    )
    await repository.create(
      makeQuestionComment({ questionId: new UniqueEntityID('question-id') }),
    )
    await repository.create(
      makeQuestionComment({ questionId: new UniqueEntityID('question-id') }),
    )

    const { questionComments } = await sut.handle({
      questionId: 'question-id',
      page: 1,
    })

    expect(questionComments).toHaveLength(3)
  })

  it('should have paginated results', async () => {
    for (let i = 1; i <= 22; i++) {
      await repository.create(
        makeQuestionComment({ questionId: new UniqueEntityID('question-id') }),
      )
    }

    const { questionComments } = await sut.handle({
      questionId: 'question-id',
      page: 2,
    })

    expect(questionComments).toHaveLength(2)
  })
})
