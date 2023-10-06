import { left, right } from './either'

const shouldFail = (bool: boolean) => {
  if (bool) {
    return left<string, boolean>('failed')
  }

  return right<string, boolean>(!bool)
}

describe('Either functionality', () => {
  it('should return a right result', async () => {
    const result = shouldFail(false)

    if (result.isRight()) {
      const shouldBeValidBoolean: boolean = result.value

      expect(shouldBeValidBoolean).toBe(true)
    }

    expect(result.isRight()).toBe(true)
  })

  it('should return a left result', async () => {
    const result = shouldFail(true)

    if (result.isLeft()) {
      const shouldBeValidString: string = result.value
      expect(shouldBeValidString).toEqual('failed')
    }

    expect(result.isLeft()).toBe(true)
  })
})
