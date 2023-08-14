# Node.js Streaming

## Examples

**Audio/video** (Writtable streams)

You can watch your video on Youtube or watch your Stream on Twitch without having to load the whole file, the same goes for music, e.g. Spotify

**Uploading files** (Readable streams)

For example, you can load a large file such as a CSV containing a whopping 40 thousand lines. When the user starts uploading that file, you already have some data to work with and as such you should make use of that time as it would worsen the experience if you had to wait the whole file to upload and then proceed to read and manipulate the file, right?

That's when _Streaming comes in handy_, you can use and abuse that to speed up the workflow of your backend!

## Streams in Node.js

By default every _request_ and _response_ are streams in Node. That means, every input and output is considered a stream.

### Terminal Example

Lets say I'm using my terminal as a _Input_ method and I want to grab everything that the user types there, I'm going to obtain a `Duplex Readable Stream`. And I can also just send the same Stream right back to the user by using `stdout` and the data sent is typed as a `Duplex Writabble Stream`, here is an example:

```ts
// stdin -> terminal input
process.stdin
  // pipe -> kinda of a connection/redirect
  .pipe(
    // stdout -> terminal output
    process.stdout,
  )
```

Terminal output:

```bash
  $ Lorem ipsum...
  > Lorem ipsum...
```

### Readable Class Example

```js
import { Readable } from 'node:stream'

/**
 * Counts from one to a hundred with the Stream Readable class
 * and pipes/redirects the output to the users terminal
 */
class OneToHundredStream extends Readable {
  // Initial value
  count = 1

  _read() {
    // Store old value and update count
    const currentCountValue = this.count++

    // By pushing "null" we are basically saying that there's no more content to be read
    if (currentCountValue > 100) this.push(null)
    else {
      // Streams can't work with primitive values, so we have to convert them to buffers
      const countBuffer = Buffer.from(
        // To create a buffer we can only use Strings
        String(currentCountValue),
      )

      // Piping the value or relaying them
      this.push(countBuffer)
    }
  }
}

// Creating the class basically creates kind of a loop to read whatever the input is, manipulate them and relay those values somewhere else, in this example we are using "pipe" to relay that data to the user's terminal
new OneToHundredStream().pipe(process.stdout)
```
