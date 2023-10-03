import { expect, test } from 'vitest'
import { Slug } from './slug'

test('should be able to create an normalized slug', () => {
  const text = 'àn wÈì@rd_exãmplë'
  const slug = Slug.createFromText(text)

  expect(slug.value).toEqual('an-weird-example')
})
