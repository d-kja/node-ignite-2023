import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user.repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from '../../errors/resource-not-found-error'
import { GetUserProfileUseCase } from './get-profile.service'

let userRepository: InMemoryUserRepository
let getUserProfileUseCase: GetUserProfileUseCase

describe('@use-case/user/get-profile', async () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    getUserProfileUseCase = new GetUserProfileUseCase(userRepository)
  })

  it('should be able to get a user by id', async () => {
    const { user: createdUser } = await userRepository.create({
      email: 'johndoe@example.com',
      name: 'john doe',
      password_hash: '...',
    })

    const { user } = await getUserProfileUseCase.handle({ id: createdUser.id })

    expect(user.email).toEqual(createdUser.email)
  })

  it("shouldn't be able to get a user using an id that doesn't exists", async () => {
    await expect(() =>
      getUserProfileUseCase.handle({ id: '123321' }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
