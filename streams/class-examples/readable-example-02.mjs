import { Readable } from 'node:stream'

class OneToHundredStream extends Readable {
  count = 1

  _read() {
    const currentCountValue = this.count++

    // Adding delay to each execution
    setTimeout(() => {
      if (currentCountValue > 100) this.push(null)
      else {
        const countBuffer = Buffer.from(
          // To create a buffer we can only use Strings
          String(`${currentCountValue}, `),
        )
        this.push(countBuffer)
      }
    }, 250)
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
new OneToHundredStream().pipe(process.stdout)
