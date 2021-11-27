const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {

  const notes = loadNotes()

  const duplicateNote = notes.find(note => note.title === title)
  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body
    })
    saveNotes(notes);
    console.log(chalk.bold.inverse.green('New note added!'))
  } else {
    console.log(chalk.bold.inverse.red('Note title taken!'))
  }
}

const removeNote = (title) => {
  const notes = loadNotes()
  const notesToKeep = notes.filter(note => note.title !== title)
  if (notes.length === notesToKeep.length) {
    console.log(chalk.bold.inverse.red(`Note "${title}" was not found`))
  } else {
    saveNotes(notesToKeep)
    console.log(chalk.bold.inverse.green(`Note "${title}" was removed`))
  }
}

const listNotes = () => {
  console.log(chalk.inverse('Your Notes'))
  console.table(loadNotes())
}

const readNote = (title) => {
  note = loadNotes().find(n => title === n.title)
  if (!note) {
    console.log(chalk.bold.inverse.red('No notes has been found'))
  } else {
    console.log(chalk.bold.inverse(`Note: ${note.title}`))

  }
}

const saveNotes = (notes) => {
  const dataJson = JSON.stringify(notes)
  fs.writeFileSync('notes.json', dataJson)
}

const loadNotes = () => {
  try {
    const databuffer = fs.readFileSync('notes.json')
    const dataJson = databuffer.toString()
    return JSON.parse(dataJson)
  } catch (error) {
    return []
  }

}

module.exports = {
  listNotes: listNotes,
  addNote: addNote,
  removeNote: removeNote,
  readNote: readNote
}