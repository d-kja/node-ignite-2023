import { Readable } from 'node:stream'

const myReadableExample = new Readable()

fetch('http://localhost:3333/file', {
  method: 'POST',
  body: myReadableExample,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  duplex: 'half',
})

const limit = 15

for (let index = 0; limit >= index; index++) {
  const text = `${index} - Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, similique ad. Hic mollitia laborum culpa harum eos! Asperiores officiis porro pariatur. Dolores sapiente excepturi nulla dolore quam accusantium consequatur saepe?\n\n`

  setTimeout(() => {
    myReadableExample.push(Buffer.from(text))
    if (index === limit) myReadableExample.push(null)
  }, 100 * index)
}
