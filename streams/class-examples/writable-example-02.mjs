import { Readable, Writable } from 'node:stream'

class OneToHundredStream extends Readable {
  timeoutMiliseconds = 250
  count = 1

  _read() {
    // Stores the current value, then incremets count
    const currentCount = this.count++

    setTimeout(() => {
      if (currentCount > 100) this.push(null)
      else {
        const buffer = Buffer.from(String(currentCount))
        this.push(buffer)
      }
    }, this.timeoutMiliseconds)
  }
}

class MultiplyByTenStream extends Writable {
  _write(chunk, encoding, callback) {
    const value = chunk.toString()
    const result = Number(value) * 10

    console.log(result)
    callback()
  }
}

/**
 * @EXAMPLE
 *
 * This example below represents the same workflow using events instead of the `Pipe`
 *
 * - Using pipeline (pipe):
 *    $ commandSelected.pipe(new SelectCliCommands())
 *
 * - Using events:
 *    $ readable.on('event-name', (chunk: Buffer) => {
 *        new MyWritable.write(chunk)
 *    })
 *
 *    class MyWritable extends Writable() {
 *        _write(chunk, encoding, callback) {
 *            const value = chunk.toString()
 *            # do something with value...
 *            callback()
 *        }
 *    }
 *
 * By using events things seem to look more obvious and simple than with pipelines...
 */
new OneToHundredStream().pipe(new MultiplyByTenStream())
