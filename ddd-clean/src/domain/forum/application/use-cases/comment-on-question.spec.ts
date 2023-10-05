import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionCommentRepository } from 'test/repositories/in-memory-question-comment.repository'
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question.repository'
import { CommentOnQuestionUseCase } from './comment-on-question.service'

let questionRepository: InMemoryQuestionRepository
let questionCommentRepository: InMemoryQuestionCommentRepository
let sut: CommentOnQuestionUseCase

describe('@use-cases/comment-on-question', () => {
  beforeEach(() => {
    questionRepository = new InMemoryQuestionRepository()
    questionCommentRepository = new InMemoryQuestionCommentRepository()

    sut = new CommentOnQuestionUseCase(
      questionRepository,
      questionCommentRepository,
    )
  })

  it('should be able to comment on a question', async () => {
    const question = makeQuestion()

    await questionRepository.create(question)

    const { questionComment } = await sut.handle({
      questionId: question.id.toString(),
      authorId: question.authorId.toString(),
      content: 'example-content',
    })

    expect(questionComment.content).toEqual('example-content')
  })
})
