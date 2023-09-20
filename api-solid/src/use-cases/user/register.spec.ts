import bcrypt from 'bcryptjs'
import { describe, expect, it } from 'vitest'
import { RegisterUserUseCase } from './register.service'

describe('@use-cases/user/register', () => {
  it('should hash the password properly when creating a new user', async () => {
    const registerUserUseCase = new RegisterUserUseCase({
      create: async (data) => ({
        id: 'id-example',
        created_at: new Date(),
        updated_at: new Date(),
        name: data.name,
        email: data.email,
        password_hash: data.password_hash,
      }),
      findByEmail: async (email) => null,
    })

    const password = '123321'

    const user = await registerUserUseCase.handle({
      name: 'john doe',
      email: 'johndoe@example.com',
      password,
    })

    const isPasswordHashedCorrectly = await bcrypt.compare(
      password,
      user.password_hash,
    )

    expect(isPasswordHashedCorrectly).toBe(true)
  })
})
