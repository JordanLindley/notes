import './App.css';
import { useEffect, useState } from 'react';
import NoteBook from './components/NoteBook';
import Note from './components/Note';
import Delete from './components/Delete';
import { json } from 'body-parser';
import { stringify } from 'querystring';
import { create } from 'domain';

export type Note = {
  id: string;
  title: string;
  body: string;
};

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<null | Note>(null);

  useEffect(() => {
    fetch('/api/notes')
      .then(async (res) => res.json())
      .then((fetchedNotes) => {
        setNotes(fetchedNotes);
      });
  }, []);

  function selectNote(note: Note) {
    setSelectedNote(note); //refactor to URL w/ note ID?
  }

  function deleteNote(id: string) {
    fetch(`/api/notes/${id}`, { method: 'DELETE' })
      .then(() => {
        setSelectedNote(null);
        setNotes(notes.filter(({ id: noteId }) => noteId !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function saveNote(note: Note) {
    fetch(`/api/notes/${note.id}`, {
      method: 'PATCH',
      body: JSON.stringify(note),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(async (res) => res.json())
      .then((savedNote) => {
        setNotes(
          notes.map((note) => {
            if (note.id == savedNote.id) {
              return savedNote;
            } else return note;
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function createNote() {
    fetch(`api/notes`, {
      method: 'POST',
      body: JSON.stringify({ title: '', body: '' }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(async (res) => res.json())
      .then((createdNote) => {
        setSelectedNote(createdNote);
        setNotes([createdNote, ...notes]);
      });
  }

  return (
    <div className="App">
      <div id="ui">
        {/* <Create> */}
        <NoteBook
          notes={notes}
          onSelectNote={selectNote}
          onCreateNote={createNote}
        />
        {selectedNote ? (
          <div className="display-container">
            <Note note={selectedNote} onSaveNote={saveNote} />
            <Delete noteId={selectedNote.id} onDeleteNote={deleteNote}></Delete>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;
