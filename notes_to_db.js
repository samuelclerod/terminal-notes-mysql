const { createConnection } = require('mysql2/promise')
const { config } = require('./db')
const { redMessage, greenMessage, invertedMessage, greenText } = require('./colored_messages')

async function listNotes() {
  let connection = null
  try {
    connection = await createConnection(config)
    const [rows] = await connection.execute('SELECT id, title FROM notes')
    invertedMessage('Your Notes')
    console.table(rows)

  } catch (error) {
    redMessage("Não foi possível listar a notas registradas no banco: \n" + error.message)
  } finally {
    connection.end()
  }
}

async function addNote(title, body) {
  let connection = null
  try {
    connection = await createConnection(config)

    const [rows] = await connection.execute('SELECT title FROM notes WHERE title like ?', [title])

    if (rows.length > 0) {
      redMessage('A título da anotação já existe!')
    } else {
      const [result] = await connection.execute('INSERT INTO notes (title, body) VALUES (?, ?)', [title, body])
      greenMessage("Nota inserida com id=" + result.insertId)
    }
  } catch (error) {
    redMessage("Não foi possível inserir o registro no banco: \n" + error.message)
  } finally {
    connection.end()
  }
}

async function removeNote(id) {
  let connection = null
  try {
    connection = await createConnection(config)

    const [{ affectedRows }] = await connection.execute('DELETE FROM `notes` WHERE id=?', [id])

    if (affectedRows > 0) {
      greenMessage("A anotação foi removida com sucesso!")
    } else {
      redMessage("A anotação não existe ou já foi removida")
    }

  } catch (error) {
    redMessage("Não foi possível removre a anotação: \n" + error.message)
  } finally {
    connection.end()
  }
}

async function readNote(id) {
  let connection = null
  try {
    connection = await createConnection(config)

    const [rows] = await connection.execute('SELECT title, body FROM notes WHERE id=?', [id])

    if (rows.length > 0) {
      const { title, body } = rows[0]
      invertedMessage(title);
      greenText('*************************************')
      greenText(body)
      greenText('*************************************')
    } else {
      redMessage('A anotação não foi encontrada.')
    }

  } catch (error) {
    redMessage("Não foi possível listar a notas registradas no banco: \n" + error.message)
  } finally {
    connection.end()
  }
}

async function updateNote(id, title = null, body = null) {
  let connection = null
  try {
    connection = await createConnection(config)

    const [rows] = await connection.execute('SELECT title, body FROM notes WHERE id=?', [id])

    if (rows.length == 0) {
      redMessage(`não foi possível encontrar a anotação com id ${id}.`)
    } else {
      const searchedUser = rows[0]
      if (title == null) { title = searchedUser.title }
      if (body == null) { body = searchedUser.body }

      const [{ affectedRows }] = await connection.execute('UPDATE notes SET title=?, body=? WHERE id=?', [title, body, id])
      if (affectedRows > 0) {
        greenMessage('Anotação atualizada com sucesso!')
      } else {
        redMessage('Não foi possível atualizar a anotação!')
      }
    }

  } catch (error) {
    redMessage("Não foi possível listar a notas registradas no banco: \n" + error.message)
  } finally {
    connection.end()
  }
}


module.exports = {
  listNotes,
  addNote,
  removeNote,
  readNote,
  updateNote
}