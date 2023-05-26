import './Note.css';
import { ChangeEvent, useState, useEffect, useMemo } from 'react';
import debounce from 'lodash.debounce';

export default function Note(props: {
  note: { id: string; title: string; body: string };
  onSaveNote: (note: { id: string; title: string; body: string }) => void;
}) {
  const [note, setNote] = useState(props.note);

  const saveNote = useMemo(
    () =>
      debounce(() => {
        props.onSaveNote({ ...note });
      }, 500),
    []
  );

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
    // Stop the invocation of the debounced function after unmounting
    return () => {
      saveNote.cancel();
    };
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
