import { Readable } from 'node:stream'

class OneToHundredStream extends Readable {
  count = 1

  _read() {
    const currentCountValue = this.count++

    if (currentCountValue > 100) this.push(null)
    else {
      const countBuffer = Buffer.from(
        // To create a buffer we can only use Strings
        String(`${currentCountValue}, `),
      )
      this.push(countBuffer)
    }
  }
}

new OneToHundredStream().pipe(process.stdout)
