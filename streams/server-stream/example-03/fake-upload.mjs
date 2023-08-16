import { randomUUID } from 'node:crypto'
import { Readable } from 'node:stream'

const myReadableExample = new Readable({
  read() {},
})

fetch('http://localhost:3333/file', {
  method: 'POST',
  // @ts-ignore
  body: myReadableExample,
  duplex: 'half',
})

const limit = 5

for (let index = 0; limit >= index; index++) {
  const text = `${index}:${randomUUID()}:${Math.random()}`

  setTimeout(() => {
    myReadableExample.push(Buffer.from(text))
    if (index === limit) myReadableExample.push(null)
  }, 100 * index)
}
