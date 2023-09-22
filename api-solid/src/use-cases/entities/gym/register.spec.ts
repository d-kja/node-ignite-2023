import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym.repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterGymUseCase } from './register.service'

let gymRepository: InMemoryGymRepository
let sut: RegisterGymUseCase

describe('@use-case/gym/register', async () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymRepository()
    sut = new RegisterGymUseCase(gymRepository)
  })

  it('should be able to create a new gym', async () => {
    const { gym } = await sut.handle({
      title: 'js',
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
