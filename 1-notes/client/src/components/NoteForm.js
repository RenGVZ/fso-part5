import React, { useState } from 'react'

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('')

  const addNote = (event) => {
    event.preventDefault()
    console.log('newNote', newNote)
    createNote({
      content: newNote,
      important: true,
    })

    setNewNote('')
  }
  return (
    <>
      <h2>Create a new note</h2>

      <form onSubmit={addNote}>
        <input value={newNote} onChange={(e) => setNewNote(e.target.value)} />
        <button type="submit">save</button>
      </form>
    </>
  )
}

export default NoteForm
