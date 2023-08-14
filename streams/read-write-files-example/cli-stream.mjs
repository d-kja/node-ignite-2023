#!/usr/bin/env node

import { Writable } from 'stream'

const args = process.argv
const availableCommands = ['read', 'write', 'copy', 'reverse', 'help', 'exit']
console.log(args)
const getHelpText = `
How to use:
  
    copy-cat [Command] [Path to target]

Commands:
  - read: print a file's content
  - write: write in the target
  - copy: create a copy of the target
  - reverse: reverse the content of the target

Path to target:
  - The path of the file you want to work with
\n\n\n\n`
console.log('Commands available\n')
availableCommands.forEach(
  (command, idx) =>
    Boolean(command) &&
    console.log(
      `  - ${command}${availableCommands.length - 1 === idx ? '\n' : ''}`,
    ),
)

const selectCommand = (command) => {
  const formattedCommand = command.toLowerCase().trim()

  if (availableCommands.includes(formattedCommand)) {
    switch (formattedCommand) {
      case 'help': {
        return getHelpText
      }
      case 'exit':
        return process.exit

      default:
        return null
    }
  }
}

class SelectCliCommands extends Writable {
  _write(chunk, encoding, callback) {
    const value = chunk.toString()
    const selectedCliCommand = selectCommand(value)

    if (!selectedCliCommand) {
      callback()
      return
    }
    if (selectedCliCommand instanceof Function) selectedCliCommand()

    console.log(selectedCliCommand)

    callback()
  }
}

const commandSelected = process.stdin

/**
 * @EXAMPLE
 *
 * This example below represents the same workflow using events instead of the `Pipe`
 *
 * - Using pipeline (pipe):
 *    $ commandSelected.pipe(new SelectCliCommands())
 *
 * - Using events:
 *    const writable = new MyWritable()
 *
 *    readable.on('event-name', (chunk: Buffer) => {
 *        writable.write(chunk)
 *    })
 *
 *    readable.on('end', () => {
 *        writable.end()
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
const writable = new SelectCliCommands()

commandSelected.on('data', (chunk) => {
  writable.write(chunk)
})

commandSelected.on('end', () => writable.end())
