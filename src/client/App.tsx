import './App.css';
import { useEffect, useState } from 'react';
import NoteBook from './components/NoteBook';
import Note from './components/Note';

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

  return (
    <div className="App">
      <NoteBook notes={notes} onSelectNote={selectNote} />
      {selectedNote ? <Note note={selectedNote} /> : null}
    </div>
  );
}

export default App;
