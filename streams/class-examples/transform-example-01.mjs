import { Readable, Transform, Writable } from 'node:stream'

class CounterStream extends Readable {
  counter = 0

  _read() {
    const currentValue = this.counter++

    if (currentValue > 100) this.push(null)
    else {
      const buffer = Buffer.from(String(currentValue))
      this.push(buffer)
    }
  }
}

// Either sending through the callback function or using this.push leads to the same result
const InvertNumberStreamUsingCallback = new Transform({
  transform(chunk, encoding, callback) {
    const value = chunk.toString()
    const multipliedValue = Number(value) * -1

    const buffer = Buffer.from(String(multipliedValue))
    callback(null, buffer)
  },
})
const InvertNumberStreamUsingPush = new Transform({
  transform(chunk, encoding, callback) {
    const value = chunk.toString()
    const multipliedValue = Number(value) * 10 * -1

    const buffer = Buffer.from(`${multipliedValue}, `)

    this.push(buffer)
    callback()
  },
})

class MultiplyByTenStream extends Writable {
  _write(chunk, encoding, callback) {
    const value = chunk.toString()
    const multipliedValue = Number(value) * 10

    console.log(multipliedValue)
    callback()
  }
}

new CounterStream()
  .pipe(InvertNumberStreamUsingPush)
  // .pipe(new MultiplyByTenStream())
  .pipe(process.stdout)
