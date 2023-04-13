import './App.css';
import { useEffect, useState } from 'react';
import NoteBook from './components/NoteBook';
import Note from './components/Note';
import Delete from './components/Delete';

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

  function createNote(note: Note) {
    fetch(`api/notes`, { method: 'POST' }).then(() => {
      setSelectedNote(note);
      // setNotes(notes.push(note)) ??? getting error that a number cannot be a param.
    });
  }

  return (
    <div className="App">
      <div id="ui">
        {/* <Create> */}
        <NoteBook notes={notes} onSelectNote={selectNote} />
        {selectedNote ? (
          <div className="display-container">
            <Note note={selectedNote} />
            <Delete noteId={selectedNote.id} onDeleteNote={deleteNote}></Delete>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;
