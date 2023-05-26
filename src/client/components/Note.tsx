import './Note.css';
import { ChangeEvent, useState, useEffect, useMemo } from 'react';
import debounce from 'lodash.debounce';

import SaveIndicator from './SaveIndicator';

export default function Note(props: {
  note: { id: string; title: string; body: string };
  onSaveNote: (note: {
    id: string;
    title: string;
    body: string;
  }) => Promise<void>;
}) {
  const [note, setNote] = useState(props.note);
  const [saveSucess, setSaveSuccess] = useState(false);

  const saveNote = useMemo(
    () =>
      debounce(
        () =>
          props
            .onSaveNote({ ...note })
            .then(() => setSaveSuccess(true))
            // TODO: render something to communicate the save failed.
            .catch(console.error),
        500
      ),
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
          {saveSucess && (
            <SaveIndicator onComplete={() => setSaveSuccess(false)} />
          )}
        </div>
        <div className="note-body">
          <textarea value={note.body} onChange={setNoteBody}></textarea>
        </div>
      </div>
    </div>
  );
}
