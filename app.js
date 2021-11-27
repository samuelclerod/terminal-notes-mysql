const yargs = require('yargs')
const {
  addNote,
  listNotes,
  removeNote,
  readNote,
  updateNote
} = require('./notes_to_db')

yargs.command({
  command: 'add',
  describe: 'Adicionar uma anotação',
  builder: {
    title: {
      describe: "titulo da anotação",
      type: 'string',
      demandOption: true,
    },
    body: {
      describe: "Corpo da nota",
      type: 'string',
      demandOption: true,
    }
  },
  handler: ({ title, body }) => {
    addNote(title, body)
  }
})

yargs.command({
  command: 'update',
  describe: 'Atualizar uma anotação',
  builder: {
    id: {
      describe: "id da anotação",
      type: 'number',
      demandOption: true,
    },
    title: {
      describe: "titulo da anotação",
      type: 'string',
    },
    body: {
      describe: "Corpo da nota",
      type: 'string',
    }
  },
  handler: ({ id, title, body }) => {
    updateNote(id, title, body)
  }
})

yargs.command({
  command: 'remove',
  describe: 'remove uma anotação',
  builder: {
    id: {
      describe: "id da anotação",
      type: 'number',
      demandOption: true,
    },
  },
  handler: ({ id }) => {
    removeNote(id)
  }
})

yargs.command({
  command: 'list',
  describe: 'listar todas a anotações',
  handler: () => {
    listNotes()
  }
})

yargs.command({
  command: 'read',
  describe: 'Mostra uma anotação',
  builder: {
    id: {
      describe: "id da anotação",
      type: 'number',
      demandOption: true,
    },
  },
  handler: ({ id }) => {
    readNote(id)
  }
})

yargs.parse()

