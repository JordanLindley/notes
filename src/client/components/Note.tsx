import './Note.css';
import { ChangeEvent, useState, useEffect, useCallback } from 'react';
import { debounce } from 'debounce';

export default function Note(props: {
  note: { id: string; title: string; body: string };
  onSaveNote: (note: { id: string; title: string; body: string }) => void;
}) {
  const [note, setNote] = useState(props.note);
  // implement useCallback to stagger network requests here.
  const saveNote = debounce(() => {
    props.onSaveNote({ ...note });
  }, 1000);

  function setNoteTitle(e: ChangeEvent<HTMLInputElement>) {
    setNote({ ...note, title: e.target.value });
    saveNote();
  }

  function setNoteBody(e: ChangeEvent<HTMLTextAreaElement>) {
    setNote({ ...note, body: e.target.value });
    saveNote();
  }

  useEffect(() => {
    setNote(props.note);
  }, [props.note]);

  return (
    <div className="note-container">
      <div className="note-display">
        <div className="note-title">
          <input type="text" value={note.title} onChange={setNoteTitle}></input>
        </div>
        <div className="note-body">
          <textarea value={note.body} onChange={setNoteBody}></textarea>
        </div>
      </div>
    </div>
  );
}
