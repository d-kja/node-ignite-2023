import { createWriteStream } from 'node:fs'
import { Readable, Transform } from 'node:stream'

/**
 * Readable is more of an interface stating that whatever you are declaring is a Readable,you don't have an direct access of the chunk. Node.js docs has an example pushing values inside of it, however that's not how your probably going to use in a real world situation.
 *
 * The most common use is creating an instance of the class and pushing values by using the pointer. I.e.:
 *
 *    const example = new Readable({...})
 *    example.push('...')
 *
 * From that point you can do whatever you want, be it using a Writable to have access to the chunks and idk write a file or execute something.
 *
 * Though IMO you can use a Transform stream or Duplex. Transform is always a better syntax and duplex is a combination of both Readable and Writable streams
 */

const readable = new Readable({
  read() {},
})

const transformData = new Transform({
  transform(chunk, encoding, callback) {
    const value = chunk.toString()
    const transformedValue = value * -1

    const valueStr = String(transformedValue) + ', '
    this.push(Buffer.from(valueStr))
    callback()
  },
})

const transformedInput = readable.pipe(transformData)
const file = createWriteStream('./output.txt')

Array.from({
  length: 15,
}).map((_, index, array) => {
  setTimeout(() => {
    readable.push(String(index + 1))
    if (array.length - 1 === index) readable.push(null)
  }, 500 * index)
})

for await (const chunk of transformedInput) {
  // Do something with it...
  const value = chunk.toString()
  file.write(`${value.trim()}\n`)
  console.log(value)
}

transformedInput.on('end', () => file.end())
