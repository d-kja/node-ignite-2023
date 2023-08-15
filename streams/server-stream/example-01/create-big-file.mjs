import { createWriteStream } from 'node:fs'
const file = createWriteStream('./example.txt')

for (let index = 0; index < 10000; index++) {
  file.write(
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, similique ad. Hic mollitia laborum culpa harum eos! Asperiores officiis porro pariatur. Dolores sapiente excepturi nulla dolore quam accusantium consequatur saepe?',
  )
}

file.end()
