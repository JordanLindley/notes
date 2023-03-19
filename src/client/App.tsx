import './App.css';
import { useEffect, useState } from 'react';
import Note from './components/Note';
import Button from './components/Button';

type Note = {
  id: string;
  created_at: Date;
  owner: string;
  title: string;
  body: string;
};

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  useEffect(() => {
    fetch('/api/notes')
      .then(async (res) => res.json())
      .then((fetchedNotes) => {
        setNotes(fetchedNotes);
      });
  }, []);

  return (
    <div className="App">
      <Button text="hi" color="purple" />
      {notes.map(({ id, title, body }) => (
        <Note key={id} title={title} body={body} />
      ))}
    </div>
  );
}

export default App;
