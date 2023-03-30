import './Note.css';
import NotePreview from './NotePreview';
import type { Note } from '../App';

export default function NoteBook(props: {
  notes: { id: string; title: string; body: string }[];
  onSelectNote: (note: Note) => void;
}) {
  function handleClick({ id, title, body }: Note) {
    props.onSelectNote({ id, title, body });
  }

  return (
    <div className="notebook">
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
