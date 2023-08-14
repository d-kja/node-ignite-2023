import { Writable } from 'node:stream'

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
process.stdin.pipe(new MultiplyByTenStream())
