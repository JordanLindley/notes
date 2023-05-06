import './Note.css';
import NotePreview from './NotePreview';
import type { Note } from '../App';

export default function NoteBook(props: {
  notes: { id: string; title: string; body: string }[];
  onSelectNote: (note: Note) => void;
  onCreateNote: () => void;
}) {
  function handleClick({ id, title, body }: Note) {
    props.onSelectNote({ id, title, body });
  }

  return (
    <div className="notebook">
      <button className="create" onClick={() => props.onCreateNote()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="new-note"
        >
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </button>
      {props.notes.map(({ id, title, body }) => (
        <div
          onClick={() => {
            handleClick({ id, title, body });
          }}
        >
          <NotePreview key={id} title={title} body={body} />
        </div>
      ))}
    </div>
  );
}
