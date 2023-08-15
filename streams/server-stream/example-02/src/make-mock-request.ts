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

const limit = 15

for (let index = 0; limit >= index; index++) {
  const text =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, similique ad. Hic mollitia laborum culpa harum eos! Asperiores officiis porro pariatur. Dolores sapiente excepturi nulla dolore quam accusantium consequatur saepe?'

  setTimeout(() => {
    myReadableExample.push(Buffer.from(text))
    if (index === limit) myReadableExample.push(null)
  }, 100 * index)
}
