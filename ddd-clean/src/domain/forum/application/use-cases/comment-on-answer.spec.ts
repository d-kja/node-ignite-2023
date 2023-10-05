import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswerCommentRepository } from 'test/repositories/in-memory-answer-comment.repository'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer.repository'
import { CommentOnAnswerUseCase } from './comment-on-answer.service'

let answerRepository: InMemoryAnswerRepository
let answerCommentRepository: InMemoryAnswerCommentRepository
let sut: CommentOnAnswerUseCase

describe('@use-cases/comment-on-answer', () => {
  beforeEach(() => {
    answerRepository = new InMemoryAnswerRepository()
    answerCommentRepository = new InMemoryAnswerCommentRepository()

    sut = new CommentOnAnswerUseCase(answerRepository, answerCommentRepository)
  })

  it('should be able to comment on a answer', async () => {
    const answer = makeAnswer()

    await answerRepository.create(answer)

    const { answerComment } = await sut.handle({
      answerId: answer.id.toString(),
      authorId: answer.authorId.toString(),
      content: 'example-content',
    })

    expect(answerComment.content).toEqual('example-content')
  })
})
