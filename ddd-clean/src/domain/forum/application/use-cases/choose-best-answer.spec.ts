import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeAnswer } from 'test/factories/make-answer'
import { makeQuestion } from 'test/factories/make-question'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer.repository'
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question.repository'
import { ChooseBestAnswerUseCase } from './choose-best-answer.service'

let answerRepository: InMemoryAnswerRepository
let questionRepository: InMemoryQuestionRepository
let sut: ChooseBestAnswerUseCase

describe('@use-cases/choose-best-answer', () => {
  beforeEach(() => {
    answerRepository = new InMemoryAnswerRepository()
    questionRepository = new InMemoryQuestionRepository()

    sut = new ChooseBestAnswerUseCase(answerRepository, questionRepository)
  })

  it('should be able to choose the best answer of a question', async () => {
    const createdQuestion = makeQuestion({
      authorId: new UniqueEntityID('author-id'),
    })
    const createdAnswer = makeAnswer(
      {
        questionId: createdQuestion.id,
      },
      new UniqueEntityID('answer-id'),
    )

    await questionRepository.create(createdQuestion)
    await answerRepository.create(createdAnswer)

    await sut.handle({
      authorId: 'author-id',
      answerId: createdAnswer.id.toString(),
    })

    expect(questionRepository.items[0].bestAnswerId?.toString()).toMatchObject(
      'answer-id',
    )
  })

  it('should not be able to delete a answer created by another user', async () => {
    const createdQuestion = makeQuestion({
      authorId: new UniqueEntityID('author-id'),
    })
    const createdAnswer = makeAnswer(
      {
        questionId: createdQuestion.id,
      },
      new UniqueEntityID('answer-id'),
    )

    await questionRepository.create(createdQuestion)
    await answerRepository.create(createdAnswer)

    await expect(() =>
      sut.handle({ authorId: 'invalid-id', answerId: 'example-id' }),
    ).rejects.toBeInstanceOf(Error)
  })
})
