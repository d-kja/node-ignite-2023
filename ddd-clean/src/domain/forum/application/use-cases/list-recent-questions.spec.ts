import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question.repository'
import { ListRecentQuestionsUseCase } from './list-recent-questions.service'

let repository: InMemoryQuestionRepository
let sut: ListRecentQuestionsUseCase

describe('@use-case/list-recent-questions', async () => {
  beforeEach(() => {
    repository = new InMemoryQuestionRepository()
    sut = new ListRecentQuestionsUseCase(repository)
  })

  it('should be able to list questions ordered by the newer dates', async () => {
    await repository.create(makeQuestion({ createdAt: new Date(2022, 0, 18) }))
    await repository.create(makeQuestion({ createdAt: new Date(2022, 0, 20) }))
    await repository.create(makeQuestion({ createdAt: new Date(2022, 0, 22) }))

    const result = await sut.handle({
      page: 1,
    })

    expect(result.isRight()).toBeTruthy()
    if (result.isRight())
      expect(result.value.questions).toEqual([
        expect.objectContaining({
          createdAt: new Date(2022, 0, 22),
        }),
        expect.objectContaining({
          createdAt: new Date(2022, 0, 20),
        }),
        expect.objectContaining({
          createdAt: new Date(2022, 0, 18),
        }),
      ])
  })

  it('should have paginated results', async () => {
    for (let i = 1; i <= 22; i++) {
      await repository.create(makeQuestion())
    }

    const result = await sut.handle({
      page: 2,
    })

    expect(result.isRight()).toBeTruthy()
    if (result.isRight()) expect(result.value.questions).toHaveLength(2)
  })
})
